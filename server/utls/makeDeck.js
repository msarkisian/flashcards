import mongoose from 'mongoose';
import Deck from '../models/deckModel.js';

const mongoURI = 'mongodb://127.0.0.1/flashcards';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .then(
    Deck.create({
      name: 'Japanese Animal Names',
      description: 'Can you translate the Japanese animal to English?',
      cards: [
        { front: 'neko', back: 'cat' },
        { front: 'ushi', back: 'cow' },
        { front: 'inu', back: 'dog' },
        { front: 'uma', back: 'horse' },
        { front: 'buta', back: 'pig' },
        { front: 'nezumi', back: 'rat/mouse' },
        { front: 'gokiburi', back: 'cockroach' },
        { front: 'sakana', back: 'fish' },
        { front: 'tori', back: 'bird' },
        { front: 'shika', back: 'deer' },
        { front: 'zou', back: 'elephant' },
        { front: 'kirin', back: 'giraffe' },
        { front: 'iruka', back: 'dolphin' },
        { front: 'kuma', back: 'bear' },
      ],
    }).then((data) => console.log(data))
  );
