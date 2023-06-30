// get content from the database
import { NextFunction, Request, Response } from 'express';
import {
  getUserIngredients,
  insertUserIngredient,
  deleteUserIngredient,
} from '../models/userModel';

const getData = async (req: Request, res: Response, next: NextFunction) => {
  const userData = await getUserIngredients(res.locals.email);

  if (userData === 'Failed') {
    res.locals.data = [];
    // console.log('query data failed');
  } else {
    res.locals.data = userData.rows;
    // console.log('queried data date');
  }
  return next();
};

const insertRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;
  const { ingredient, imagepath } = req.body;
  console.log('email', email);
  console.log('insert ingredients', ingredient);

  try {
    await insertUserIngredient(email, ingredient, imagepath);
    console.log('inserted record to user ingredients');
    return next();
  } catch (e) {
    return { message: { err: 'Error updating the database' } };
  }
};

const deleteRecord = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = res.locals;
  const { ingredient } = req.body;
  console.log('email', email);
  console.log('delete ingredients', ingredient);

  try {
    await deleteUserIngredient(email, ingredient);
    console.log('inserted record to user ingredients');
    return next();
  } catch (e) {
    return { message: { err: 'Error updating the database' } };
  }
};

export default {
  getData,
  insertRecord,
  deleteRecord,
};
