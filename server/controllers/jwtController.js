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
    { expiresIn: 30 }
  );
  next();
};

export default jwtController;
