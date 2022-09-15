import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'placeholder secret';
const jwtController = {};

jwtController.write = (req, res, next) => {
  const { _id, username } = res.locals.user;
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
    if (!req.cookies.jwt) {
      return next({
        log: null,
        status: 401,
        message: 'You are not logged in',
      });
    }
    const info = jwt.verify(req.cookies.jwt, JWT_SECRET);
    res.locals.isLoggedIn = true;
    res.locals.user = info;
    next();
  } catch {
    next({
      log: null,
      status: 401,
      message: 'Invalid JWT. Try logging in again.',
    });
  }
};

export default jwtController;
