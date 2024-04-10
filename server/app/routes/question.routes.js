const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/question.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/save-question", controller.saveQuestion);
  app.post("/api/get-user-questions", controller.getUserQuestions);

  app.post("/api/save-paper-question", controller.saveQuestionAnswer);
  app.post("/api/get-user-paper-questions", controller.getUserPaperQuestions);

  app.post("/api/get-questions", controller.paginatedResults);
  app.post("/api/get-question", controller.getQuestion);
  app.post("/api/update-question", controller.updateQuestion);
};
