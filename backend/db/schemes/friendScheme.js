const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

const Friend = new Schema({
  userID: {
    type: String,
    required: true,
  },
  friends: {
    type: Array,
    required: true,
  },
  requests: {
    type: Array,
    required: true,
  },
  responses: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Friend", Friend);