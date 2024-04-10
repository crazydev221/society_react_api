const config = require("../config/auth.config");
const db = require("../models");
const Page = db.page;
const fileUpload = require('express-fileupload');


exports.save = (req, res) => {

  //const { image } = req.files;
  console.log(req.files);
  return;
  if (!image) return res.sendStatus(400);

  image.mv(__dirname + '/uploads/' + image.name);

    res.sendStatus(200);

    return;

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
