import { Router, NextFunction, Request, Response } from 'express';
import recipesController from '../controllers/recipesController';

const router = Router();

router.post('/findmatches', recipesController.getRecipes, (req, res) => {
  console.log(res.locals);
  return res.status(200).json(res.locals.rows);
});

export default router;
