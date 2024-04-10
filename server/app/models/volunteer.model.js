const mongoose = require("mongoose");

const Volunteer = mongoose.model(
  "Volunteer",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Volunteer;
