import User from '../models/userModel.js';

const userDeckController = {};

userDeckController.getUserDecks = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: res.locals.user.userId });
    res.locals.userDecks = user.decks.map((deck) => {
      const obj = {
        name: deck.name,
        cardCount: deck.cards.length,
        _id: deck._id,
      };
      if (deck.description) obj.description = deck.description;
      return obj;
    });
    next();
  } catch (err) {
    next({
      log: 'Error in getUserDecks: ' + err,
      status: 500,
      message: 'Error getting user decks',
    });
  }
};

userDeckController.getUserDeck = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: res.locals.user.userId });
    const deck = user.decks.find(
      (deck) => deck._id.toString() === req.params.id
    );
    res.locals.deck = deck;
    next();
  } catch (err) {
    next({
      log: 'Error in getUserDeck: ' + err,
      status: 500,
      message: 'Error getting user deck',
    });
  }
};

userDeckController.addUserDeck = async (req, res, next) => {
  if (!req.body.name)
    return next({
      log: null,
      status: 400,
      message: 'All decks require a name',
    });
  if (!req.body.cards || req.body.cards.length === 0)
    return next({
      log: null,
      status: 400,
      message: 'Decks require at least one card',
    });

  try {
    const user = await User.findOne({ _id: res.locals.user.userId });
    const newDeck = {
      name: req.body.name,
      cards: req.body.cards,
    };
    if (req.body.description) newDeck.description = req.body.description;
    user.decks.push(newDeck);
    await user.save();
    res.locals.userDeck = newDeck;
    next();
  } catch (err) {
    next({
      log: 'Error in addUserDeck: ' + err,
      status: 500,
      message: 'Error creating user deck',
    });
  }
};

export default userDeckController;
