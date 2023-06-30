import { Router } from 'express';
import loadContentController from '../controllers/loadContentController';
import sessionController from '../controllers/sessionController';
import { getUser, getUserIngredients } from '../models/userModel';

const router = Router();

router.get(
  '/',
  sessionController.validateSessionToken,
  loadContentController.getData,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

router.post(
  '/insert',
  sessionController.validateSessionToken,
  loadContentController.insertRecord,
  (req, res) => {
    return res.status(200).end();
  }
);

router.post(
  '/delete',
  sessionController.validateSessionToken,
  loadContentController.deleteRecord,
  (req, res) => {
    return res.status(200).end();
  }
);

router.post('/test', async (req, res) => {
  const { email } = req.body;
  const data = await getUserIngredients(email);
  // console.log(data);
  if (data !== 'Failed') res.json(data.rows);
  // getUserIngredients(email).then(response => res.json(res));
});

export default router;
