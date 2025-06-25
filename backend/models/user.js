const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  organization: String, // New field
});

module.exports = mongoose.model('User', userSchema);