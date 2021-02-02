const controller = require("../controllers/permission.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/permissions",
    controller.createPermission
  );

  app.get(
    "/api/permissions",
    controller.getPermission
  );
};