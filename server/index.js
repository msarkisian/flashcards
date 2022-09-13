import express from 'express';
import { default as mongoose } from 'mongoose';
import cookieParser from 'cookie-parser';
import registerRouter from './routes/register.js';
import decksRouter from './routes/decks.js';
import userController from './controllers/userController.js';
import jwtController from './controllers/jwtController.js';

const PORT = process.env.PORT || 3000;

const app = express();
const mongoURI = 'mongodb://127.0.0.1/flashcards';
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(cookieParser());

app.use('/register', registerRouter);
app.use('/decks', decksRouter);

app.get('/login', jwtController.verify, (req, res) => {
  res.status(200).json(res.locals.user);
});
app.post(
  '/login',
  userController.verifyUser,
  jwtController.write,
  (req, res) => {
    res.cookie('jwt', res.locals.jwt, { httpOnly: true });
    res
      .status(200)
      .json({ username: res.locals.user.username, id: res.locals.user._id });
  }
);

app.use('*', (req, res) => {
  res.status(404).send('404: Page Not Found');
});
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Unknown express middleware error',
    status: 500,
    message: 'Internal Server Error',
  };
  const error = Object.assign(defaultError, err);
  if (error.log) console.log(error.log);
  res.status(error.status).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});

export default app;
