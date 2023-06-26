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

router.get(
  '/allingredients',
  recipesController.getAllIngredients,
  (req, res) => {
    // console.log(res.locals.allIngredients);
    return res.status(200).json(res.locals.allIngredients);
  }
);

export default router;
