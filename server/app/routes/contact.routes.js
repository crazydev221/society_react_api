const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/contact.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/save-contact", controller.saveContact);

  app.post('/api/contacts', controller.create);
  app.get('/api/contacts', controller.findAll);
  app.get('/api/contacts/:id', controller.findOne);
  app.put('/api/contacts/:id', controller.update);
  app.delete('/api/contacts/:id', controller.delete);
};
