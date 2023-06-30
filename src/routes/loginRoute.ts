import { Router } from 'express';
import loginController from '../controllers/loginController';
import sessionController from '../controllers/sessionController';

const router = Router();

router.post(
  '/',
  // sessionController.validateSessionToken,
  loginController.login,
  (_req, res) => {
    return res.end();
  }
);

router.post(
  '/authenticate',
  loginController.authenticate,
  sessionController.createSessionToken,
  (_req, res) => {
    res.send(201);
  }
);

export default router;
