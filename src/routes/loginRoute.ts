import { Router } from 'express';
import loginController from '../controllers/loginController';
import sessionController from '../controllers/sessionController';

const router = Router();

router.post(
  '/',
  sessionController.validateSessionToken,
  loginController.login,
  (_req, res) => {
    res.end();
  }
);

router.post('/authenticate', loginController.authenticate, (_req, res) => {
  res.end();
});

export default router;
