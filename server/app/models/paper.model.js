const mongoose = require("mongoose");

const Paper = mongoose.model(
  "Paper",
  new mongoose.Schema({
    title: String,
    authors: String,
    paper_id: String,
    year:String,
    citation_count: String,
    is_paper: {
      type: Number,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: { type: Date, default: new Date }, 

  })
);

module.exports = Paper;
