const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Users", User);
