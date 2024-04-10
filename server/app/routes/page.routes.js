const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/page.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.post('/api/pages', controller.create);
  app.get('/api/pages', controller.findAll);
  app.get('/api/pages/:id', controller.findOne);
  app.put('/api/pages/:id', controller.update);
  app.delete('/api/pages/:id', controller.delete);


};
