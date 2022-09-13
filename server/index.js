const express = require('express');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();
const mongoURI = 'mongodb://127.0.0.1/flashcards';
mongoose.connect(mongoURI).then(() => console.log('Connected to MongoDB'));

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
});
