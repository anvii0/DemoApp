const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  age: String,
  address: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);