import { Router } from 'express';
import deckController from '../controllers/deckController.js';

const router = Router();

router.get('/:id', deckController.getDeck, (req, res) => {
  res.status(200).json(res.locals.deck);
});

export default router;
