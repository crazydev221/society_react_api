const mongoose = require("mongoose");

const Leadershiptestimonial = mongoose.model(
  "Leadershiptestimonial",
  new mongoose.Schema({
    name: String,
    note:String,
    description:String,
    content:String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Leadershiptestimonial;
