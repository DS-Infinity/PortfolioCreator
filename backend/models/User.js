const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength: 255,
  },
  email: {
    type: String,
    minlength: 4,
  },
  image: {
    type: String,
  },
  accountCreationDate: {
    type: Date,
    default: Date.now(),
  },
  phone: {
    type: String,
    minlength: 10,
  },
  address: {
    type: String,
  },
  profession: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  skills: {
    type: Array,
  },
  projects: {
    type: Array,
  },
  color: {
    type: String,
  },
  url: {
    type: String,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
