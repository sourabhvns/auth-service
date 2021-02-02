const db = require("../models");
const ROLES = db.role;

checkDuplicateRole = (req, res, next) => {
    ROLES.findOne({
      where: {
        name: req.body.name
      }
    }).then(role => {
      if (role) {
        res.status(400).send({
          message: "Failed! Role is already present!"
        });
        return;
      }
    });
};

const verifyRole = {
    checkDuplicateRole: checkDuplicateRole
};

module.exports = verifyRole;