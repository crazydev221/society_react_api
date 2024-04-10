const config = require("../config/auth.config");
const db = require("../models");
const fs = require('fs');
const Invite = db.Invite;

exports.saveInvite = (req, res) => {

  var myquery = { user_id: req.body.user};
  Invite.remove(myquery, function(err, obj) {
    if (err) throw err;
    //res.send({ message: "Invite deleted successfully!" });
  });

  const Invite = new Invite({
    user_id: req.body.user,
    Invite_id: req.body.email,
  });
` `
  Invite.save((err, Invite) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.send({ message: "Invite saved successfully!" });
    }

  });

};
