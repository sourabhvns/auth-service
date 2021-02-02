module.exports = (sequelize, Sequelize) => {
    const Permission = sequelize.define("permission", {
      name: {
        type: Sequelize.STRING
      }
    });
    return Permission;
};