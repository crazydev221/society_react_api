const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name:String,
    last_name:String,
    username: String,
    email: String,
    phone:String,
    password: String,
    password_code:String,
    picture:String,
    address:String,
    city:String,
    state:String,
    postcode:String,
    country:String,
    country_code:String,
    is_volunteer:String,
    website:String,
    description:String,
    facebook:String,
    instagram:String,
    twitter:String,
    gofundme:String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
