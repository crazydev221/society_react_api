const mongoose = require("mongoose");

const Supportgallery = mongoose.model(
  "Supportgallery",
  new mongoose.Schema({
    name: String,
    disease:String,
    picture: String,
    description:String,
    address:String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Supportgallery;
