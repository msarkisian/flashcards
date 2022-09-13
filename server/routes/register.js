import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.post('/', userController.addUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

export default router;
