import { NextFunction, Request, Response } from 'express';
import recipeModel from '../models/recipeModel';

const recipesController: { [key: string]: any } = {};

recipesController.getRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ingredients = req.body.ingredients as string[];
  console.log(req.body);

  if (!ingredients) return next({ message: { err: 'No ingredients' } });

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
    where   i.name in (${sqlIn})
    group by r.id
    having  r.ingredients = count(*);`;

  const results: any = await recipeModel.rawSql?.(sql, []);

  res.locals.count = results.rowCount;
  res.locals.recipes = results.rows;
  return next();
};

export default recipesController;
