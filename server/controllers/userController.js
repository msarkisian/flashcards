import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const userController = {};
const SALT_WORK_FACTOR = 10;

userController.addUser = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return next({
      log: null,
      status: 400,
      message: 'Username and Password required',
    });
  }
  try {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_WORK_FACTOR);
    const newUser = await User.create({
      username: req.body.username,
      passwordHash: passwordHash,
    });
    res.locals.user = {
      id: newUser._id,
      username: newUser.username,
    };
    next();
  } catch (err) {
    return next({
      log: 'Error in addUser: ' + err,
      message: 'Error adding user to database',
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    const verified = await bcrypt.compare(req.body.password, user.passwordHash);
    if (verified) {
      res.locals.user = user;
      return next();
    }
    return next({
      log: null,
      status: 400,
      message: 'Invalid username or password',
    });
  } catch (err) {
    next({
      log: 'Error in verifyUser: ' + err,
      message: 'Error verifying user',
    });
  }
};

export default userController;
