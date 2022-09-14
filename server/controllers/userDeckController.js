import User from '../models/userModel.js';

const userDeckController = {};

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
