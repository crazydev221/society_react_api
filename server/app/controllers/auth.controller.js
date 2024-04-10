const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { now } = require("mongoose");

var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "werpurplesociety@gmail.com",
        pass: "ebhwocvjmqwfrdwm"
    }
});

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        country_code:user.country_code,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    });
};


exports.sendPassword = (req, res) => {

  var profile = '';
  var pass_code = '';

  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      try {

        var code = bcrypt.hashSync(user.email+now(), 8);

        mailOptions = {
          to: user.email,
          subject: "Your reset password link for your account in werpurple.org",
          html: 'Hello '+user.first_name+', <br/> Please click the below provided URL to reset your password in werpurple.org - <br/> <a href="https://werpurple.org/reset-password?code='+code+'">https://werpurple.org/reset-password?code='+code+'</a> <br/> Thank you'
        }
        
        smtpTransport.sendMail(mailOptions, function (error, response) {
        });

        var arr = {"password_code": code}
        var myquery = { _id: user._id };
        var newvalues = { $set: arr };
        User.updateOne(myquery, newvalues, function(err, res) {

        });
      


      } catch (err) {
        return res.status(404).send({ message: "Reset password link could not be generated." });
      }
      res.status(200).send("Password reset link is sent to your registered account");
    });

    //res.status(200).send("Password reset link is sent to your registered account");

};


exports.checkCode = (req, res) => {

  try {

  User.findOne({
    password_code: req.body.code
  }).exec((err, user) => {

      if (!user) {
        return res.status(404).send({ message: "Code Not found." });
      }else {
        return res.status(200).json('Code is correct');
      }

    }); 

  } catch (err) {
     return res.status(404).send({ message: "Code not found" });
  }

    

};   


exports.updatePassword = (req, res) => {

  var arr = {
   "password": bcrypt.hashSync(req.body.password, 8),
   "Password_code":""
 };

 try {
   var myquery = { password_code: req.body.code };
   var newvalues = { $set: arr };
   User.updateOne(myquery, newvalues, function(err, res) {
     if (err) throw err;
     console.log("1 document updated");
    
   });

   res.status(200).json('Your password updated successfully');
 } catch (err) {
   return res.status(404).send({ message: "Invalid password reset attempt." });
 }

};