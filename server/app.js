const express = require("express");
const serverless = require('serverless-http');
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
var bodyParser= require('body-parser');
const path = require('path');
const fs = require('fs');
const https = require('https');
const httpProxy = require('http-proxy');

const app = express();

var corsOptions = {origin: '*'};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const directory = path.join(__dirname, 'utils/uploads');
app.use('/uploads', express.static(directory));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// const options = {
//   key: fs.readFileSync('uploads/key.pem'),
//   cert: fs.readFileSync('uploads/cert.pem'),
//   passphrase: 'amitabh'
// };

// const server = https.createServer(options, (req, res) => {
//   //res.writeHead(200);
//   //res.end('Hello, world!');
// });

// server.on('request', app);

// server.listen(8082, () => {
//   console.log('Server started on port 8082.');
// });

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://werpurple:werpurple@werpurple.u4unvru.mongodb.net/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/paper.routes")(app);
require("./app/routes/contact.routes")(app);
require("./app/routes/volunteer.routes")(app);
require("./app/routes/page.routes")(app);
require("./app/routes/drug.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/juniorpurplesociety.routes")(app);
require("./app/routes/image.routes")(app);

require("./app/routes/ourworkgallery.routes")(app);
require("./app/routes/support.routes")(app);
require("./app/routes/leadershiptestimonial.routes")(app);
require("./app/routes/nitaliablanketgallery.routes")(app);
require("./app/routes/leadershipteam.routes")(app);
require("./app/routes/purpleaparmentgallery.routes")(app);
require("./app/routes/juniorpurplesocietygallery.routes")(app);

require("./app/routes/ourworkgallery.routes")(app);

require("./app/routes/newsletter.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

module.exports.handler = serverless(app);
