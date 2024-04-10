const config = require("../config/auth.config");
const db = require("../models");
const LeadershipTeam = db.leadershipteam;

// Create and Save a new User
exports.create = (req, res) => {

  var picture = '';
  
  if(req.file.location  !== undefined && req.file.location  !== ""){

    var str = req.file.location;
    var rest = str.substring(0, str.lastIndexOf("/") + 1);
    var last = str.substring(str.lastIndexOf("/") + 1, str.length);
    picture = last;
    
  }

  const note = new LeadershipTeam({
      name: req.body.name,
      designation: req.body.designation,
      description: req.body.description,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      picture:picture,
  });

  // Save LeadershipTeam in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Page."
      });
  });
};
// Retrieve and return all LeadershipTeam from the database.
exports.findAll = (req, res) => {
  LeadershipTeam.find()
  .then(notes => {
    return res.json({
      leadershipteams:notes,
    });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving pages."
      });
  });
};
// Find a single Page with a id
exports.findOne = (req, res) => {
  LeadershipTeam.findById(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });            
      }
      res.send(note);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Note not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving note with id " + req.params.id
      });
  });
};
// Update a Page identified by the id in the request
exports.update = (req, res) => {
  if( "file" in req ){
    var arr = {"name":req.body.name, "designation": req.body.designation,"description": req.body.description,"twitter": req.body.twitter,"facebook": req.body.facebook,"instagram": req.body.instagram,"picture":req.file.filename}
  }else {
  var arr = {"name":req.body.name, "designation": req.body.designation,"description": req.body.description,"twitter": req.body.twitter,"facebook": req.body.facebook,"instagram": req.body.instagram}
  }

  //console.log("AMIT");
  //console.log(req.file);
  //console.log(arr);

  LeadershipTeam.findByIdAndUpdate(req.params.id, arr, { new: true })
  .then((page) => {
    if (!page) {
      return res.status(404).send({
        message: "no page found",
      });
    }
    res.status(200).send(page);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};
// Delete a Page with the specified id in the request
exports.delete = (req, res) => {
  
  LeadershipTeam.findByIdAndRemove(req.params.id)
  .then(note => {
     // if(!note) {
          //return res.status(404).send({
          //    message: "Page not found with id " + req.params.id
          //});
     // }
      res.send({message: "Page deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Page not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Page with id " + req.params.id
      });
  });
};
