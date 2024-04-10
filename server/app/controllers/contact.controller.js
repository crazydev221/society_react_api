const config = require("../config/auth.config");
const db = require("../models");
const Contact = db.contact;

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "werpurplesociety@gmail.com",
        pass: "ebhwocvjmqwfrdwm"
    }
});

exports.saveContact = (req, res) => {

  const contact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });

contact.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      
    }

  });

 var topic = '';
 if(req.body.topics  !== undefined){
  topic = req.body.topics;
 }

  mailOptions = {
    to: 'anthony@werpurple.org',
    subject: "New contact information submitted",
    html: 'Hello Admin, <br/> New contact information is provided below <br/> <strong>Name</strong>: '+req.body.first_name+' '+req.body.last_name+' <br/> <strong>Email</strong>: '+req.body.email+'<br/> <strong>Phone</strong>: '+req.body.phone+'<br/> <strong>Message</strong>: '+req.body.message+'<br/> <strong>Topic</strong>: '+topic+' <br/> Thank you'
  }
  
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
        //console.log(error);
    } else {
        //console.log("Message sent: " , response);
    }
  });

  res.send({ message: "Contact saved successfully!" });
};


//ADMIN WORK...

exports.create = (req, res) => {

  const note = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
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

