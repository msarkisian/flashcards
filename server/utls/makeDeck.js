import mongoose from 'mongoose';
import Deck from '../models/deckModel.js';

const mongoURI = 'mongodb://127.0.0.1/flashcards';
mongoose
  .connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .then(
    Deck.create({
      name: 'Example2',
      description: 'Another example card deck',
      cards: [
        {
          front:
            'I have endevoured to make this one a little longer, to test some frontend formatting stuff. I hope this ends up being worth my time',
          back: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
        },
        { front: 'B', back: '2' },
        { front: 'C', back: '3' },
        { front: 'D', back: '4' },
        { front: 'E', back: '5' },
      ],
    }).then((data) => console.log(data))
  );
