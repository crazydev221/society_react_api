const mongoose = require("mongoose");

const Leadershipteam = mongoose.model(
  "Leadershipteam",
  new mongoose.Schema({
    name: String,
    designation:String,
    picture: String,
    description:String,
    twitter:String,
    facebook:String,
    instagram:String,
    createdAt: { type: Date, default: new Date }, 
  })
);

module.exports = Leadershipteam;
