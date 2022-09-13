import Deck from '../models/deckModel.js';
const deckController = {};

deckController.getDeck = async (req, res, next) => {
  try {
    const deck = await Deck.findOne({ _id: req.params.id });
    if (deck) {
      res.locals.deck = deck;
      return next();
    }
    return next({
      log: null,
      status: 400,
      message: 'Cannot find specified deck',
    });
  } catch (err) {
    next({
      log: 'Error in getDeck: ' + err,
      message: 'Error getting deck from database',
    });
  }
};

export default deckController;
