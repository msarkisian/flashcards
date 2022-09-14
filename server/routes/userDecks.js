import { Router } from 'express';
import jwtController from '../controllers/jwtController.js';
import userDeckController from '../controllers/userDeckController.js';

const router = Router();

router.post(
  '/',
  jwtController.verify,
  userDeckController.addUserDeck,
  (req, res) => {
    res.status(200).json(res.locals.userDeck);
  }
);

export default router;
