const config = require("../config/auth.config");
const db = require("../models");
const Notification = db.notification;

exports.getUserNotificaions = (req, res) => {

  Notification.find({
    user_id: req.body.user
  }).sort({ _id: -1 }).exec((err, notifications) => {
     
    if (!notifications) {
      return res.status(404).send({ message: "Notifications not found" });
    }

    return res.status(200).json(notifications);

  });  



}; 

