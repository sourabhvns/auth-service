const db = require("../models");
const Role = db.role;
const Permission = db.permission;

exports.createRole = (req, res) => {
  // Save Role to Database
  Role.findOrCreate({where: {name: req.body.role}})
    .then(result => {
        const [ role, created ] = result;
        role.setPermissions(req.body.permission_id).then(() => {
          res.status(200).send(role);
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getRole = (req, res) => {
  Role.findAll({include: [Permission]}).then(roles => {
    res.status(200).send(roles);
  }).catch(err => {
    res.status(500).send({ message: err.message });
    });
}