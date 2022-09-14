import { Router } from 'express';
import jwtController from '../controllers/jwtController.js';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/', jwtController.verify, (req, res) => {
  res.status(200).json(res.locals.user);
});
router.post('/', userController.verifyUser, jwtController.write, (req, res) => {
  res.cookie('jwt', res.locals.jwt, { httpOnly: true });
  res
    .status(200)
    .json({ username: res.locals.user.username, id: res.locals.user._id });
});
router.delete('/', (req, res) => {
  res.clearCookie('jwt');
  res.sendStatus(204);
});

export default router;
