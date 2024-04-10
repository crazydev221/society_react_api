const config = require("../config/auth.config");
const db = require("../models");
const Question = db.question;

exports.saveQuestion = (req, res) => {

  const question = new Question({
    user_id: req.body.user,
    question: req.body.question,
  });

question.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.send({ message: "Question saved successfully!" });
    }

  });

};

exports.saveQuestionAnswer = (req, res) => {

  const question = new Question({
    user_id: req.body.user,
    paper_id: req.body.paper_id,
    question: req.body.question,
    answer: req.body.answer,
  });

question.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.send({ message: "Question with answer saved successfully!" });
    }

  });

};




exports.getUserQuestions = (req, res) => {

  Question.find({
    user_id: req.body.user
  }).sort({ _id: -1 }).exec((err, questions) => {
     
    if (!questions) {
      return res.status(404).send({ message: "Questions not found" });
    }
    
    return res.status(200).json(questions);

  });  

}; 


exports.getUserPaperQuestions = (req, res) => {

  Question.find({
    user_id: req.body.user,
    paper_id: req.body.paper_id
  }).sort({ _id: -1 }).exec((err, questions) => {
     
    if (!questions) {
      return res.status(404).send({ message: "Questions not found" });
    }
    
    return res.status(200).json(questions);

  });  

}; 


exports.paginatedResults = (req, res, next) => {

  const page = parseInt(req.body.page);
  const limit = parseInt(req.body.limit);
  const skipIndex = (page - 1) * limit;
  const results = {};

  try {
    results.results = Question.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();
       next();
       return res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ message: "Error Occured" });
  }

}; 


exports.getQuestion = (req, res) => {

  Question.find({
    _id: req.body.id
  }).exec((err, question) => {
     
    if (!question) {
      return res.status(404).send({ message: "Questions not found" });
    }

    return res.status(200).json(question);

  });  



}; 




exports.updateQuestion = (req, res) => {
  try {
    const question_update_status =  Question.findOneAndUpdate({_id: req.body.id}, {$set:{answer: req.body.answer}});
    res.status(200).json('success');
  } catch (err) {
    return res.status(404).send({ message: "Questions could not be updated." });
  }
}; 
