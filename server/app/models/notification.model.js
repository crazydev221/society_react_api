const mongoose = require("mongoose");

const Notification = mongoose.model(
  "Notification",
  new mongoose.Schema({
    notification: String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: { type: Date, default: new Date }, 

  })
);

module.exports = Notification;
