const mongoose = require("mongoose");

const Invite = mongoose.model(
  "Invite",
  new mongoose.Schema({
    email: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: { type: Date, default: new Date }, 

  })
);

module.exports = Invite;
