const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/image.controller");

var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'utils/uploads/pages/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //app.post("/api/save-image", controller.save);

  app.post('/api/save-image', upload.single('image'), function(req, res, next) {
    console.log("file", req.file);
    //console.log("files", req.files);
    console.log("body", req.body);

    var image = req.file

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    return res.status(200).send({
      url: "https://purplehelp.org:8082/uploads/pages/"+req.file.filename
    });

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) return res.sendStatus(400);

    console.log("AMITABH "+__dirname);

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '/uploads/pages/' + image.name);

    // All good
    res.sendStatus(200);

    console.log("file", req.file);
    console.log("files", req.files);
    console.log("body", req.body);
    next();
    res.sendStatus(200);
  });


  app.post('/api/save-image1', upload.single('image'), controller.save);

};
