const config = require("../config/auth.config");
const db = require("../models");
const Page = db.page;


// Create and Save a new User
exports.create = (req, res) => {
  // Create a Page
  const note = new Page({
      title: req.body.title,
      content:req.body.content,
  });

  // Save Page in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Page."
      });
  });
};
// Retrieve and return all pages from the database.
exports.findAll = (req, res) => {
  Page.find()
  .then(notes => {
    return res.json({
      pages:notes,
    });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving pages."
      });
  });
};
// Find a single Page with a id
exports.findOne = (req, res) => {
  Page.findById(req.params.id)
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
 
  Page.findByIdAndUpdate(req.params.id, req.body, { new: true })
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
  
  Page.findByIdAndRemove(req.params.id)
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
