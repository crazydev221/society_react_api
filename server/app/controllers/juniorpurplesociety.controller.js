const config = require("../config/auth.config");
const db = require("../models");
const Juniorpurplesociety = db.juniorpurplesociety;

exports.saveJuniorpurplesociety = (req, res) => {

  const juniorpurplesociety = new Juniorpurplesociety({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });

  juniorpurplesociety.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.send({ message: "Request saved successfully!" });
    }

  });


};

//ADMIN WORK...

exports.create = (req, res) => {

  const note = new Juniorpurplesociety({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });

  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Juniorpurplesociety."
      });
  });
};

exports.findAll = (req, res) => {
  Juniorpurplesociety.find().sort({createdAt: -1})
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Juniorpurplesocieties."
      });
  });
};

exports.findOne = (req, res) => {
  Juniorpurplesociety.findById(req.params.id)
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

exports.update = (req, res) => {
 
  Juniorpurplesociety.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((juniorpurplesociety) => {
    if (!juniorpurplesociety) {
      return res.status(404).send({
        message: "no juniorpurplesociety found",
      });
    }
    res.status(200).send(juniorpurplesociety);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};

exports.delete = (req, res) => {
  
  Juniorpurplesociety.findByIdAndRemove(req.params.id)
  .then(note => {
      res.send({message: "Juniorpurplesociety deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Juniorpurplesociety not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Juniorpurplesociety with id " + req.params.id
      });
  });
};



