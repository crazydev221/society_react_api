const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/juniorpurplesociety.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/save-juniorpurplesociety", controller.saveJuniorpurplesociety);

  app.post('/api/juniorpurplesocieties', controller.create);
  app.get('/api/juniorpurplesocieties', controller.findAll);
  app.get('/api/juniorpurplesocieties/:id', controller.findOne);
  app.put('/api/juniorpurplesocieties/:id', controller.update);
  app.delete('/api/juniorpurplesocieties/:id', controller.delete);

};
