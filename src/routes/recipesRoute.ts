import { Router, NextFunction, Request, Response } from 'express';
import hellofreshController from '../controllers/recipesController';

const router = Router();

router.get(
  '/',
  hellofreshController.getRecipes,
  (req: Request, res: Response) => {
    res.end();
  }
);

export default router;
