import { Schema, default as mongoose } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

export default mongoose.model('User', userSchema);
