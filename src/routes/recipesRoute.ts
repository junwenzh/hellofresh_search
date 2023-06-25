import { Router, NextFunction, Request, Response } from 'express';
import recipesController from '../controllers/recipesController';

const router = Router();

router.post(
  '/findmatches',
  recipesController.getRecipes,
  recipesController.getAdditionalData,
  (req, res) => {
    return res.status(200).json(res.locals.recipes);
  }
);

export default router;
