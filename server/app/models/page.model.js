const mongoose = require("mongoose");

const Page = mongoose.model(
  "Page",
  new mongoose.Schema({
    title: String,
    content: String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Page;
