const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.newsletter;

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "werpurplesociety@gmail.com",
        pass: "ebhwocvjmqwfrdwm"
    }
});

exports.create = (req, res) => {

  const note = new Contact({
    email: req.body.email,
  });


  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Contact."
      });
  });
};

exports.findAll = (req, res) => {
  Contact.find().sort({createdAt: -1})
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Contacts."
      });
  });
};

exports.findOne = (req, res) => {
  Contact.findById(req.params.id)
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
 
  Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((contact) => {
    if (!contact) {
      return res.status(404).send({
        message: "no contact found",
      });
    }
    res.status(200).send(contact);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};

exports.delete = (req, res) => {
  
  Contact.findByIdAndRemove(req.params.id)
  .then(note => {
      res.send({message: "Contact deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Contact not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Contact with id " + req.params.id
      });
  });
};

