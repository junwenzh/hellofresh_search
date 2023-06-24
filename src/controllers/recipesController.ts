import { NextFunction, Request, Response } from 'express';
import query from '../models/recipeModel';

const recipesController: { [key: string]: any } = {};

recipesController.getRecipes = async (
  req: Response,
  res: Request,
  next: NextFunction
) => {
  const sql = 'select * from recipes;';
  // const results: any = await query(sql, []);
  console.log(1);
  return next();
};

export default recipesController;
