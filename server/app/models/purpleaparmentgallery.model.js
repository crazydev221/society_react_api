const mongoose = require("mongoose");

const Purpleaparmentgallery = mongoose.model(
  "Purpleaparmentgallery",
  new mongoose.Schema({
    title: String,
    picture: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Purpleaparmentgallery;
