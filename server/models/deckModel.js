import mongoose, { Schema } from 'mongoose';

const deckSchema = new Schema({
  name: { type: String, required: true },
  owner: mongoose.Types.ObjectId,
  description: String,
  cards: [
    {
      front: { type: String, required: true },
      back: { type: String, required: true },
    },
  ],
});

export default mongoose.model('Deck', deckSchema);
