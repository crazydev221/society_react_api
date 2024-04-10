const mongoose = require("mongoose");

const Nitaliablanketgallery = mongoose.model(
  "Nitaliablanketgallery",
  new mongoose.Schema({
    title: String,
    picture: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Nitaliablanketgallery;
