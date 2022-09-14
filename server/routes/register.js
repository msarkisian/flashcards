import { Router } from 'express';
import jwtController from '../controllers/jwtController.js';
import userController from '../controllers/userController.js';

const router = Router();

router.post('/', userController.addUser, jwtController.write, (req, res) => {
  res.cookie('jwt', res.locals.jwt, { httpOnly: true });
  res
    .status(200)
    .json({ username: res.locals.user.username, id: res.locals.user._id });
});

export default router;
