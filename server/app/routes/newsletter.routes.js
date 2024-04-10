const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/newsletter.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post('/api/newsletters', controller.create);
  app.get('/api/newsletters', controller.findAll);
  app.get('/api/newsletters/:id', controller.findOne);
  app.put('/api/newsletters/:id', controller.update);
  app.delete('/api/newsletters/:id', controller.delete);
};
