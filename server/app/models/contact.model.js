const mongoose = require("mongoose");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    message: String,
  })
);

module.exports = Contact;
