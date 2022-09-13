import mongoose, { Schema } from 'mongoose';

const deckSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  cards: [
    {
      front: { type: String, required: true },
      back: { type: String, required: true },
    },
  ],
});

export default mongoose.model('Deck', deckSchema);
