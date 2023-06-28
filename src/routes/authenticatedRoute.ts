import { Router } from 'express';
import loadContentController from '../controllers/loadContentController';

const router = Router();

router.get('/', loadContentController.getData, (req, res) => {
  res.status(200).json(res.locals.data);
});

router.post('/', loadContentController.updateData, (req, res) => {
  res.status(200).end();
});

export default router;
