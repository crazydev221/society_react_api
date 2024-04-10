const mongoose = require("mongoose");

const Newsletter = mongoose.model(
  "Newsletter",
  new mongoose.Schema({
    email: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Newsletter;
