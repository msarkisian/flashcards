import { Schema, default as mongoose } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  decks: [
    {
      name: { type: String, required: true },
      description: String,
      createdAt: { type: Date, default: Date.now },
      cards: [
        {
          front: { type: String, required: true },
          back: { type: String, required: true },
          metadata: {
            difficulty: { type: Number, default: 1 },
            lastSeen: { type: Date },
            nextScheduled: { type: Date },
          },
        },
      ],
    },
  ],
});

export default mongoose.model('User', userSchema);
