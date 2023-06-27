import { Router } from 'express';
import loginController from '../controllers/loginController';

const router = Router();

router.post('/', loginController.login, (req, res) => {
  res.send(res.locals.secret);
});

router.post('/authenticate', loginController.authenticate, (req, res) => {
  res.send('Login success');
});

export default router;
