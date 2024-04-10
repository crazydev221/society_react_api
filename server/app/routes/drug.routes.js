const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/drug.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/drug", controller.getDrugs);
  app.post("/api/search-drugs", controller.searchDrugs);
  app.post("/api/suggest-drugs", controller.getAutoSuggestDrugs);
};
