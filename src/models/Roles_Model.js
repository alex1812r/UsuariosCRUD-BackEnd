const { Schema, model } = require('mongoose');

const RolesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
  }
});

module.exports = model('roles', RolesSchema);