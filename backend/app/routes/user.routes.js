const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/users/:id/role",
    [authJwt.verifyToken],
    controller.assignRole
  );

  app.get(
    "/api/users/:id/role",
    [authJwt.verifyToken],
    controller.getUserRole
  );

  app.post(
    "/api/users/:id/permission",
    [authJwt.verifyToken],
    controller.checkUserPermission
  );
};