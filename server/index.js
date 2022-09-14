import express from 'express';
import { default as mongoose } from 'mongoose';
import cookieParser from 'cookie-parser';
import registerRouter from './routes/register.js';
import decksRouter from './routes/decks.js';
import loginRouter from './routes/login.js';
import userDecksRouter from './routes/userDecks.js';
import userController from './controllers/userController.js';
import jwtController from './controllers/jwtController.js';

const PORT = process.env.PORT || 3000;

const app = express();
const mongoURI = 'mongodb://127.0.0.1/flashcards';
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/decks', decksRouter);
app.use('/userdecks', userDecksRouter);

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
