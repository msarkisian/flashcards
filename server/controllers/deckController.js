import Deck from '../models/deckModel.js';
const deckController = {};

deckController.getDecks = async (req, res, next) => {
  try {
    const decks = await Deck.find({});
    res.locals.decks = decks.map((deck) => {
      return { _id: deck._id, name: deck.name, cardCount: deck.cards.length };
    });
    next();
  } catch (err) {
    next({
      log: 'Error in getDecks: ' + err,
      message: 'Error getting decks from database',
    });
  }
};
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
