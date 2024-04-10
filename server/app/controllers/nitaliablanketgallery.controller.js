const config = require("../config/auth.config");
const db = require("../models");
const NitaliaBlanketGallery = db.nitaliablanketgallery;


// Create and Save a new User
exports.create = (req, res) => {

  var picture = '';
  
  if(req.file.location  !== undefined && req.file.location  !== ""){

    var str = req.file.location;
    var rest = str.substring(0, str.lastIndexOf("/") + 1);
    var last = str.substring(str.lastIndexOf("/") + 1, str.length);
    picture = last;
    
  }

  const note = new NitaliaBlanketGallery({
      title: req.body.title,
      picture:picture,
  });

  // Save NitaliaBlanketGallery in the database
  note.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Page."
      });
  });
};
// Retrieve and return all NitaliaBlanketGallery from the database.
exports.findAll = (req, res) => {
  NitaliaBlanketGallery.find()
  .then(notes => {
    return res.json({
      nitaliablankets:notes,
    });
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving pages."
      });
  });
};
// Find a single Page with a id
exports.findOne = (req, res) => {
  NitaliaBlanketGallery.findById(req.params.id)
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
    var arr = {"title":req.body.title, "picture":req.file.filename}
  }else {
  var arr = {"title":req.body.title}
  }

  //console.log("AMIT");
  //console.log(req.file);
  //console.log(arr);

  NitaliaBlanketGallery.findByIdAndUpdate(req.params.id, arr, { new: true })
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
  
  NitaliaBlanketGallery.findByIdAndRemove(req.params.id)
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
