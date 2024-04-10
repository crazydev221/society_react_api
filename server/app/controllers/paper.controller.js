const config = require("../config/auth.config");
const db = require("../models");
const fs = require('fs');
const Paper = db.paper;
const Notification = db.notification;

exports.savePaper = (req, res) => {

  if(req.body.check === 1){

  const paper = new Paper({
    user_id: req.body.user,
    paper_id: req.body.paperId,
    citation_count: req.body.citationCount,
    title: req.body.title,
    authors: req.body.authors,
    is_paper: req.body.is_paper,
    year: req.body.year
  });

  paper.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{

      if(req.body.is_paper === 1){
        var msg = "You saved: The paper "+req.body.title;
      }else {
        var msg = "You saved: The drug "+req.body.title;
      }

      const notification = new Notification({
        user_id :req.body.user,
        notification:msg
      });      

      notification.save((err, paper) => {
        if (err) {
        }else{
        }
      });

      res.send({ message: "Paper saved successfully!" });
    }

  });
}else {

  var myquery = { user_id: req.body.user, paper_id: req.body.paperId };
  Paper.remove(myquery, function(err, obj) {
    if (err) throw err;
    res.send({ message: "Paper deleted successfully!" });
  });
}
};

exports.getUserPapers = (req, res) => {
 
if(req.body.search_text  !== undefined && req.body.search_text  !== ''){

  console.log(req.body.search_text+ " "+req.body.user);

  var search_text=req.body.search_text;
  Paper.find({user_id: req.body.user, is_paper: req.body.is_paper, title: { $regex: '.*' + search_text + '.*' , $options: 'i'} }).exec((err, papers) => {
     
   console.log(papers);

    if (!papers) {
      return res.status(404).send({ message: "Papers not found" });
    }

    return res.status(200).json(papers);
    //console.log(req.body.user);
    //console.log(papers);
  }); 

}else { 

 Paper.find({
    user_id: req.body.user
  }).exec((err, papers) => {
     
    if (!papers) {
      return res.status(404).send({ message: "Papers not found" });
    }

    return res.status(200).json(papers);
    //console.log(req.body.user);
    //console.log(papers);
  });  
}
  //const sortByDate =  obj.sort((a, b) => b.createdAt - a.createdAt);
  //res.status(200).json(obj);

}; 


exports.getPdfData = (req, res) => {

}; 