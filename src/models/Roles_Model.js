const { Schema, model } = require('mongoose');

const RolesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
  },
  users: {
    type: Array,
    default: []
  }
});

module.exports = model('roles', RolesSchema);