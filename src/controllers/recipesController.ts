import { NextFunction, Request, Response } from 'express';
import recipeModel from '../models/recipeModel';

const recipesController: { [key: string]: any } = {};

recipesController.getRecipes = async (
  req: Response,
  res: Request,
  next: NextFunction
) => {
  const sql = 'select * from recipes;';
  const results: any = await recipeModel.rawSql?.(sql, []);
  console.log('results:', results);
  return next();
};

export default recipesController;
