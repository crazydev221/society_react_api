const aws_config = require("../config/aws.config");
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");


var multer = require('multer');
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
    credentials: {
        accessKeyId: aws_config.accessKeyId, // store it in .env file to keep it safe
        secretAccessKey: aws_config.secretAccessKey
    },
    region: "us-east-1" // this is the region that you select in AWS account
})

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: "static.werpurple.org", // change it as per your project requirement
  acl: "public-read", // storage access type
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: (req, file, cb) => {
    cb(null, {fieldname: file.image})
},
key: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, 'uploads/users/'+Date.now() + fileName);
}
  
});

var upload = multer({ storage: s3Storage });

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/update-user', upload.single('image'), controller.updateUser);

  app.post('/api/get-user', controller.getUser);

  //app.post('/api/update-user', upload.single('file'), controller.updateUser);
  app.post('/api/update-user-info',  controller.updateUser1);

  app.post('/api/invite-users',  controller.sendInvites);

  app.post('/api/check-email',  controller.checkEmail);

  app.post('/api/save-newsletter',  controller.saveNewsletter);

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.post('/api/users', controller.create);
  app.get('/api/all-users', controller.findAll);
  app.get('/api/users/:id', controller.findOne);
  app.put('/api/users/:id', controller.update);
  app.delete('/api/users/:id', controller.delete);



  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
