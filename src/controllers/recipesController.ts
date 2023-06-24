import { NextFunction, Request, Response } from 'express';
import recipeModel from '../models/recipeModel';

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  const ingredients = req.body.ingredients;

  if (!ingredients || !Array.isArray(ingredients))
    return next({ message: { err: 'No ingredients supplied' } });

  let sqlIn = '';

  ingredients.forEach(v => {
    sqlIn += `'${v}',`;
  });

  sqlIn = sqlIn.slice(0, -1);

  const sql = `
    select  r.id
    from    ingredients i
    join    recipe_ingredients ri on i.id = ri.ingredient_id
    join    recipes r on ri.recipe_id = r.id
    where   i.name in (${sqlIn}) and i.pantry = FALSE
    group by r.id
    having  r.totalingredients = count(*);`;

  const results: any = await recipeModel.rawSql?.(sql, []);

  res.locals.count = results.rowCount;
  res.locals.recipes = results.rows.map((e: { id: string }) => e.id);

  return next();
};

export default {
  getRecipes,
};
