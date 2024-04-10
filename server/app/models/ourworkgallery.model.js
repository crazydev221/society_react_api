const mongoose = require("mongoose");

const Ourworkgallery = mongoose.model(
  "Ourworkgallery",
  new mongoose.Schema({
    title: String,
    picture: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Ourworkgallery;
