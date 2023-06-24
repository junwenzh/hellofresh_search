import { Router } from 'express';
import hellofreshController from '../controllers/hellofreshController';

const router = Router();

// Test route
// router.get('/token', (req, res) => res.status(200).send('Ok'));

router.get('/token', hellofreshController.getToken, (req, res) => {
  res.status(200).send(res.locals.token);
});

export default router;
