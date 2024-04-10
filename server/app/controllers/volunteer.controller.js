const config = require("../config/auth.config");
const db = require("../models");
const Volunteer = db.volunteer;
const Notification = db.notification;

exports.saveVolunteer = (req, res) => {

  const volunteer = new Volunteer({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message
  });

volunteer.save((err, paper) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{

      //const notification = new Notification({
        //user_id :req.body.user,
        //notification:"Your Volunteer request form has been sent."
      //});      

     // notification.save((err, paper) => {
       // if (err) {
       // }else{
       // }
      //});

      res.send({ message: "Volunteer saved successfully!" });
    }

  });


};




exports.updateUser = (req, res) => {

    var path = './public/images/users/';
    console.log(req.body.last_name);
    if(req.body.is_image_uploaded === 1) {
      
      var file_name = Math.floor(Math.random() * (99999999999 - 1) + 1);
      var base64Image = req.body.uploaded_image.split(';base64,').pop();
      fs.writeFile(path+file_name+'.png', base64Image, {encoding: 'base64'}, async (err) => {

       var picture = file_name+'.png';

       
       var arr = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postcode: req.body.postcode,
        country: req.body.country,
        country_code: req.body.country_code,
        picture:picture
      };
      });

    } else {
     var arr = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone: req.body.phone,
      username: req.body.username,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      postcode: req.body.postcode,
      country: req.body.country,
      country_code: req.body.country_code,
    };
    } 


    console.log(req.body.id);

    console.log(arr);

    try {
      const udpate =  User.findOneAndUpdate({_id: req.body.id}, {$set:arr});
      res.status(200).json('success');
    } catch (err) {
      return res.status(404).send({ message: "Profile could not be updated." });
    }

};

//ADMIN WORK...

exports.create = (req, res) => {

  const note = new Volunteer({
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
          message: err.message || "Some error occurred while creating the Volunteer."
      });
  });
};

exports.findAll = (req, res) => {
  Volunteer.find().sort({createdAt: -1})
  .then(notes => {
      res.send(notes);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Volunteers."
      });
  });
};

exports.findOne = (req, res) => {
  Volunteer.findById(req.params.id)
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
 
  Volunteer.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((volunteer) => {
    if (!volunteer) {
      return res.status(404).send({
        message: "no volunteer found",
      });
    }
    res.status(200).send(volunteer);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};

exports.delete = (req, res) => {
  
  Volunteer.findByIdAndRemove(req.params.id)
  .then(note => {
      res.send({message: "Volunteer deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Volunteer not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete Volunteer with id " + req.params.id
      });
  });
};
