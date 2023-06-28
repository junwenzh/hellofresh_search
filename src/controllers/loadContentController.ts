// get content from the database
import { NextFunction, Request, Response } from 'express';
import { getUserIngredients, updateUserIngredients } from '../models/userModel';

const getData = async (req: Request, res: Response, next: NextFunction) => {
  const userData = await getUserIngredients(res.locals.email);

  if (userData === 'Failed' || !userData.rowCount) {
    res.locals.data = [];
  } else {
    res.locals.data = userData.rows.map(e => e.ingredient);
  }
  return next();
};

const updateData = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = res.locals;
  const { ingredients } = req.body;
  try {
    await updateUserIngredients(email, ingredients);
    return next();
  } catch (e) {
    return { message: { err: 'Error updating the database' } };
  }
};

export default {
  getData,
  updateData,
};
