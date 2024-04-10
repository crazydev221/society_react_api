const mongoose = require("mongoose");

const Juniorpurplesociety = mongoose.model(
  "Juniorpurplesociety",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    message: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Juniorpurplesociety;
