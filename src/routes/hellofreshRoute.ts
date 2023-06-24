import { Router } from 'express';
import hellofreshController from '../controllers/hellofreshController';
import recipesController from '../controllers/recipesController';

const router = Router();

// Test route
router.get('/token', (req, res) => res.status(200).send('Ok'));
router.post('/token', (req, res) => res.status(200).send('Ok'));

router.post('/findmatches', recipesController.getRecipes, (req, res) => {
  console.log(res.locals);
  return res.status(200).json(res.locals.rows);
});

// router.get(
//   '/getall',
//   hellofreshController.getToken,
//   hellofreshController.getAllRecipes,
//   (req, res) => {
//     res.status(200).send('Success');
//   }
// );

export default router;
