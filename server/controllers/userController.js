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

export default userController;
