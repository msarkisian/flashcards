const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
