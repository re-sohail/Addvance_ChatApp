const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  toUser: { type: mongoose.Schema.Types.User, ref: "User" },
  fromUser: { type: mongoose.Schema.Types.User, ref: "User" },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Message", messageSchema);
