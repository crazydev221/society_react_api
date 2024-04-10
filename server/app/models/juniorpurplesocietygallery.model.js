const mongoose = require("mongoose");

const Juniorpurplesocietygallery = mongoose.model(
  "Juniorpurplesocietygallery",
  new mongoose.Schema({
    title: String,
    picture: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Juniorpurplesocietygallery;
