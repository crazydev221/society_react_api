const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/paper.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/save-paper", controller.savePaper);

  app.post("/api/get-user-papers", controller.getUserPapers);


  app.get("/api/get-pdf-data", controller.getPdfData);
};
