const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {type: String, unique: true, required: true },
  password: { type: String, required: true },
  isTnC: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
