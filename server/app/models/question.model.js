const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    question: String,
    answer: String,
    paper_id:String,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    createdAt: { type: Date, default: new Date }, 

  })
);

module.exports = Question;
