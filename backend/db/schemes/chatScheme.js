const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

const Chat = new Schema({
  room: {
    type: Object,
    required: true,
  },
  messages: {
    type: Array,
    required: true
  },
  userId1: {
    type: String,
    required: true
  },
  userId2: {
    type: String,
    required: true
  }
  
});

module.exports = mongoose.model("Chat", Chat);