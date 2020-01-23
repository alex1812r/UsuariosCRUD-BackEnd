const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rol: {
    type: Object,
    required: true
  },
  access_token: String,
  status: {
    type: Boolean,
    default: false
  }
});

module.exports = model('users', UserSchema);