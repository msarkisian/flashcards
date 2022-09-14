import { Router } from 'express';
import jwtController from '../controllers/jwtController.js';
import userDeckController from '../controllers/userDeckController.js';

const router = Router();

router.get(
  '/',
  jwtController.verify,
  userDeckController.getUserDecks,
  (req, res) => {
    res.status(200).json(res.locals.userDecks);
  }
);
router.get(
  '/:id',
  jwtController.verify,
  userDeckController.getUserDeck,
  (req, res) => {
    res.status(200).json(res.locals.deck);
  }
);
router.post(
  '/',
  jwtController.verify,
  userDeckController.addUserDeck,
  (req, res) => {
    res.status(200).json(res.locals.userDeck);
  }
);

export default router;
