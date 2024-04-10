const aws_config = require("../config/aws.config");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/ourworkgallery.controller");



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
    cb(null, 'uploads/ourworks/'+Date.now() + fileName);
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

  app.post('/api/ourworks', upload.single('image'), controller.create);
  app.get('/api/ourworks', controller.findAll);
  app.get('/api/ourworks/:id', controller.findOne);
  app.put('/api/ourworks/:id', upload.single('image'), controller.update);
  app.delete('/api/ourworks/:id', controller.delete);

};
