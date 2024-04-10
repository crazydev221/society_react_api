const config = require("../config/auth.config");
const db = require("../models");
const LeadershipTestimonial = db.leadershiptestimonial;


// Create and Save a new User
exports.create = (req, res) => {
  // Create a LeadershipTestimonial
  const note = new LeadershipTestimonial({
      name: req.body.name,
      note: req.body.note,
      description: req.body.description,
      content:req.body.content,
  });

  // Save LeadershipTestimonial in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the LeadershipTestimonial."
      });
  });
};
// Retrieve and return all LeadershipTestimonials from the database.
exports.findAll = (req, res) => {
  LeadershipTestimonial.find()
  .then(notes => {
    return res.json({
      leadershiptestimonials:notes,
    });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving LeadershipTestimonials."
      });
  });
};
// Find a single LeadershipTestimonial with a id
exports.findOne = (req, res) => {
  LeadershipTestimonial.findById(req.params.id)
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
// Update a LeadershipTestimonial identified by the id in the request
exports.update = (req, res) => {
 
  LeadershipTestimonial.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((LeadershipTestimonial) => {
    if (!LeadershipTestimonial) {
      return res.status(404).send({
        message: "no LeadershipTestimonial found",
      });
    }
    res.status(200).send(LeadershipTestimonial);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};
// Delete a LeadershipTestimonial with the specified id in the request
exports.delete = (req, res) => {
  
  LeadershipTestimonial.findByIdAndRemove(req.params.id)
  .then(note => {
     // if(!note) {
          //return res.status(404).send({
          //    message: "LeadershipTestimonial not found with id " + req.params.id
          //});
     // }
      res.send({message: "LeadershipTestimonial deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "LeadershipTestimonial not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete LeadershipTestimonial with id " + req.params.id
      });
  });
};
