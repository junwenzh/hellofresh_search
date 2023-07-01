import { Router } from 'express';
// import hellofreshController from '../controllers/hellofreshController';

const router = Router();

// Test route
router.get('/test', (req, res) => res.status(200).send('Ok'));

// router.post(
//   '/getall',
//   hellofreshController.getToken,
//   hellofreshController.getAllRecipes,
//   (req, res) => {
//     res.status(200).send('Success');
//   }
// );

export default router;
