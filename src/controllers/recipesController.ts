import { NextFunction, Request, Response } from 'express';
import recipeModel from '../models/recipeModel';
import { QueryResultRecipe } from '../types/DbTypes';

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  const { ingredients, exact } = req.body;

  if (!ingredients || !Array.isArray(ingredients))
    return next({ message: { err: 'No ingredients supplied' } });

  let sqlIn = '';

  ingredients.forEach(v => {
    sqlIn += `'${v}',`;
  });

  sqlIn = sqlIn.slice(0, -1);

  const sql = `
    select  r.id, r.name, r.websiteurl, r.imagepath, r.headline, r.description,
            r.category, r.difficulty, r.calories, r.preptime, r.totaltime,
            r.favoritescount, r.averagerating, 
            row_number() over(partition by r.name order by r.favoritescount desc) as rn
    from    ingredients i
    join    recipe_ingredients ri on i.id = ri.ingredient_id
    join    recipes r on ri.recipe_id = r.id
    where   i.name in (${sqlIn}) and i.pantry = FALSE
    group by r.id, r.name, r.websiteUrl, r.imagePath, r.headline, r.description,
            r.category, r.difficulty, r.calories, r.prepTime, r.totalTime,
            r.favoritesCount, r.averageRating
    having  r.totalingredients = count(*)
    order by r.favoritesCount desc, ratingsCount desc, averageRating desc;`;

  const results: any = await recipeModel.rawSql?.(sql, []);

  res.locals.count = results.rowCount;
  res.locals.recipes = results.rows;

  return next();
};

const getAdditionalData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.recipes.length)
    return next({ message: { err: 'No recipes found' } });

  for (const recipe of res.locals.recipes as QueryResultRecipe[]) {
    try {
      const data = await Promise.allSettled([
        recipeModel.queryCuisines(recipe.id),
        recipeModel.queryIngredients(recipe.id),
        recipeModel.querySteps(recipe.id),
        recipeModel.queryTags(recipe.id),
      ]);

      recipe.cuisines =
        data[0].status === 'fulfilled' && data[0].value !== 'Failed'
          ? data[0].value.rows
          : [];
      recipe.ingredients =
        data[1].status === 'fulfilled' && data[1].value !== 'Failed'
          ? data[1].value.rows
          : [];
      recipe.steps =
        data[2].status === 'fulfilled' && data[2].value !== 'Failed'
          ? data[2].value.rows
          : [];
      recipe.tags =
        data[3].status === 'fulfilled' && data[3].value !== 'Failed'
          ? data[3].value.rows
          : [];
    } catch (e) {
      return next({ message: { err: 'Failed to get additional data' } });
    }
  }

  return next();
};

const getAllIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ingredients = await recipeModel.queryAllIngredients();
    if (ingredients === 'Failed')
      return next({
        message: { err: 'Error querying database for all ingredients' },
      });
    res.locals.allIngredients = ingredients.rows;
    // console.log(res.locals.allIngredients);
    return next();
  } catch (e) {
    return next({
      message: { err: 'Error querying database for all ingredients' },
    });
  }
};

export default {
  getRecipes,
  getAdditionalData,
  getAllIngredients,
};
