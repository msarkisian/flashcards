import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants.js';
const jwtController = {};

jwtController.write = (req, res, next) => {
  const { _id, username } = res.locals.user;
  console.log(JWT_SECRET);
  res.locals.jwt = jwt.sign(
    {
      userId: _id,
      username: username,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  next();
};

jwtController.verify = (req, res, next) => {
  try {
    const info = jwt.verify(req.cookies.jwt, JWT_SECRET);
    res.locals.isLoggedIn = true;
    res.locals.user = info;
    next();
  } catch {
    next({
      log: null,
      status: 400,
      message: 'Invalid JWT. Try logging in again.',
    });
  }
};

export default jwtController;
