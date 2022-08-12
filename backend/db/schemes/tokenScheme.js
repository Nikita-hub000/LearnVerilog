const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = require("bluebird");

const Token = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Token", Token);
