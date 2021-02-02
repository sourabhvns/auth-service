const db = require("../models");
const User = db.user;
const Role = db.role;
const Permission = db.permission;
const Op = db.Sequelize.Op;

exports.assignRole = (req,res) => {
  const roles = req.body.roles;
  if (roles && roles.length === 0){
    res.status(400).send({ message: "please pass roles in the body" });
  }
  User.findByPk(req.params.id).then(user => {
      if (!user){
        res.status(500).send({ message: "Invalid user id" });
      }
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "Role assigned successfully!" });
        });
      });
    }
  )
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
}

exports.getUserRole = (req,res) => {
  let user_role = [];
  User.findByPk(req.params.id).then(user => {
    if (!user){
      res.status(500).send({ message: "Invalid user id" });
    } 
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        user_role.push({role: roles[i].name, id: roles[i].id});
      }
      res.status(200).send(user_role);
    });
  });
}

exports.checkUserPermission = (req,res) => {
  let role_id = [];
  let permission_allowed = [];
  let permission_not_allowed = [];
  let user_permission_id = [];
  const permission_id = req.body.permission_id;
  User.findOne({where: {id: req.params.id}}).then(user => {
    if (!user){
      res.status(500).send({ message: "Invalid user id" });
    }
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        role_id.push(roles[i].id);
      }
    });
  });
  Role.findAll({
    where: {
      name: {
        [Op.or]: role_id
      }
    },
    include: [Permission]
  }).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      permissions = roles[i].permissions
      for (let j = 0; j < permissions.length; j++) {
        console.log(permissions[j].id)
        user_permission_id.push(permissions[j].id);
      }
    }
    permission_id.forEach(id => {
      if (user_permission_id.includes(id)){
        permission_allowed.push(id)
      }
      else{
        permission_not_allowed.push(id)
      }
    });
    res.status(200).send({
      permission_not_allowed,
      permission_allowed
    });
  });
}