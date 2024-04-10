const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Newsletter = db.newsletter;

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "werpurplesociety@gmail.com",
        pass: "ebhwocvjmqwfrdwm"
    }
});

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.checkEmail = (req, res) => {
  
  Newsletter.findOne({
    email: req.body.email
   }).exec((err, newsletter) => {
      
     if (!newsletter) {
       return res.status(200).send({ message: "Email not found" });
     }
 
     return res.status(200).json(newsletter);
     //console.log(req.body.user);
     //console.log(papers);
   });  

 
 }; 

exports.saveNewsletter = (req, res) => {

  var is_save = 1;
  
if(is_save === 1){

  const note = new Newsletter({
    email: req.body.email,
});

note.save()
.then(data => { 
}).catch(err => {
});

mailOptions = {
  to: 'anthony@werpurple.org',
  subject: "New newsletter join request from "+req.body.email,
  html: 'Hi, <br/> New newsletter join request from '+req.body.email+'<br/> Thank you'
}

smtpTransport.sendMail(mailOptions, function (error, response) {
  if (error) {
      //console.log(error);
  } else {
      //console.log("Message sent: " , response);
  }
});

res.status(200).send("Newsletter subscribed");

}else {
  res.status(200).send("Newsletter already subscribed");
}

};  


exports.sendInvites = (req, res) => {

   var email_string = req.body.email_string;
   var name_string = req.body.name_string;

   var arr = email_string.split(",");

   var arr_name = name_string.split(",");

   arr.map((sendto, index) => {
      
    mailOptions = {
      to: sendto,
      subject: "Join The Purple Society and Let's Support Each Other in Our Journey Against Childhood Cancer!",
      html: "Dear "+arr_name[index]+", <br/>I hope this email finds you amidst moments of strength, love, and hope, even amidst the challenges you and your family are currently facing. I am reaching out to you as someone who understands the profound impact that childhood cancer has on the lives of our loved ones. Today, I want to share a ray of hope with you and extend an invitation to join The Purple Society, an organization that has been a lifeline for me and my family during our journey.<br/>As a parent, friend, or family member, you hold a unique perspective on the immense challenges we face. During these times, finding a community of unwavering support becomes vital, a place where we can find solace, strength, and the understanding that only those who have walked a similar path can provide.I recently discovered the incredible Purple Ai system, an innovative tool that has brought new dimensions to our journey. It utilizes artificial intelligence to analyze vast amounts of medical data, offering potential breakthroughs and assisting in researching our precious children's most effective treatment options. Witnessing its positive impact on my loved one's treatment plan has been nothing short of inspiring. <br/>Joining The Purple Society at <a href='http://werpurple.org'>http://werpurple.org</a> will grant you access to various resources tailored to our unique needs. It is a community where we can find the latest updates on childhood cancer research, complete drug data research, and educational materials that empower us to advocate for the best possible care for our children.<br/> Please take a moment to visit <a href='http://werpurple.org'>http://werpurple.org</a> and create your account. It's 100% FREE! Together, we can provide unwavering support, research, and love to our children, ensuring they never face this battle alone. <br/>Remember, you are not alone on this journey. The Purple Society and its incredible members are here, ready to embrace you with open arms, lend a listening ear, and offer the unconditional support we all need.<br/>Please consider joining our community at The Purple Society. Together, we can light the way for better research and support. Remember, One Person CAN Make a Difference. <br/><br/> "+req.body.first_name+" "+req.body.last_name+"<br/>A Friend Supporting Our Children's Journey "
    }

    smtpTransport.sendMail(mailOptions, function (error, response) {
      if (error) {
          //console.log(error);
      } else {
          //console.log("Message sent: " , response);
      }
    });
   }); 

   res.status(200).send("Invitation Sent");

}  

exports.updateUser = (req, res) => {

     var path = './public/images/users/';
     console.log(req.body);

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


    //console.log(arr); return;

    if( "location" in req ){


        var str = req.file.location;
        var rest = str.substring(0, str.lastIndexOf("/") + 1);
        var last = str.substring(str.lastIndexOf("/") + 1, str.length);
        picture = last;
      

      var arr = {"first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": req.body.email,
      "phone": req.body.phone,
      "username": req.body.username,
      "address": req.body.address,
      "city": req.body.city,
      "state": req.body.state,
      "postcode": req.body.postcode,
      "country": req.body.country,
      "country_code": req.body.country_code,
      "picture":picture}
    }else {
      var arr = {"first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "email": req.body.email,
      "phone": req.body.phone,
      "username": req.body.username,
      "address": req.body.address,
      "city": req.body.city,
      "state": req.body.state,
      "postcode": req.body.postcode,
      "country": req.body.country,
      "country_code": req.body.country_code}
    }
    
    try {
      var myquery = { _id: req.body.id };
      var newvalues = { $set: arr };
      User.updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
       
      });

      res.status(200).json('Your profile updated successfully');
    } catch (err) {
      return res.status(404).send({ message: "Profile could not be updated." });
    }

};


exports.updateUser1 = (req, res) => {


  var path = './public/images/users/';
   console.log(req.body);

   var arr = {
    is_volunteer: req.body.is_volunteer,
    website: req.body.website,
    description: req.body.description,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
    gofundme: req.body.gofundme,

  };

  try {
    var myquery = { _id: req.body.id };
    var newvalues = { $set: { is_volunteer: req.body.is_volunteer,
      website: req.body.website,
      description: req.body.description,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      gofundme: req.body.gofundme, } };
    User.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
     
    });

    res.status(200).json('Your profile information updated successfully');
  } catch (err) {
    return res.status(404).send({ message: "Profile information could not be updated." });
  }

};

exports.updateUserTest = (req, res) => {


  var path = './public/images/users/';
   //console.log(req.body);

   var arr = {
    first_name: "Amitabh",
    last_name: "Dhar",
    email: "amittest123@test.com",
    phone: "14566411",
    username: "amit7899",
    address: "Sukna",
    city: "Siliguri",
    state: "West Bengal",
    postcode: "45454",
    country: "India",
    country_code: "IN",
  };

  try {


    var myquery = { _id: "6430261d00e1ce206cdfd7fa" };
    var newvalues = { $set: { first_name: "Amitabh",
    last_name: "Dhar",
    email: "amittest123@test.com",
    phone: "14566411",
    username: "amit7899",
    address: "Sukna",
    city: "Siliguri",
    state: "West Bengal",
    postcode: "45454",
    country: "India",
    country_code: "IN", } };
    User.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
     
    });

  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "Profile could not be updated." });
  }

};


exports.getUser = (req, res) => {
  
   User.find({
      _id: req.body.user
    }).exec((err, user) => {
       
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      return res.status(200).json(user);
      //console.log(req.body.user);
      //console.log(papers);
    });  

  
  }; 

  //ADMIN FUNCTIONS...

  exports.create = (req, res) => {
    // Create a User
    const note = new User({
        
        first_name: req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email
    });

    // Save User in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};


  exports.findAll = (req, res, next) => {

    User.find()
    .then(notes => {

      return res.json({
        users:notes,
      });

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });

    return;


  var page = parseInt(req.query.page) || 1;
  var limit = 10;

  try {
    // execute query with page and limit values
    const users =  User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // get total documents in the Posts collection 
    const count =  User.countDocuments();

    // return response with posts, total pages, and current page
    return res.json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }


  return;
};


exports.findOne = (req, res) => {
  User.findById(req.params.id)
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
   
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "no user found",
      });
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    return res.status(404).send({
      message: "error while updating the post",
    });
  });
  
};

exports.delete = (req, res) => {
    
  User.findByIdAndRemove(req.params.id)
  .then(note => {
     // if(!note) {
          //return res.status(404).send({
          //    message: "User not found with id " + req.params.id
          //});
     // }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete User with id " + req.params.id
      });
  });
};