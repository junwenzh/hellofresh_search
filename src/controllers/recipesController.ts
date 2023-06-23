import { NextFunction, Request, Response } from 'express';
import query from '../models/recipeModel';

const helloFreshController: { [key: string]: any } = {};

helloFreshController.getRecipes = async (
  req: Response,
  res: Request,
  next: NextFunction
) => {
  const sql = 'select * from recipes;';
  const results: any = await query(sql, []);
  console.log(1);
};

export default helloFreshController;
