const db = require("../models");
const Permission = db.permission;

exports.createPermission = (req, res) => {
  Permission.findOrCreate({where: {name: req.body.permission}})
    .then(result => {
        const [ permission, created ] = result;
        res.status(200).send(permission);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getPermission = (req, res) => {
  Permission.findAll().then(permission => {
    res.status(200).send(permission);
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};