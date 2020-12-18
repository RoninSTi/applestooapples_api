const { Model } = require('sequelize');

class ProjectAddress extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      addressId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM,
        values: ['mailing', 'material', 'project']
      }
    }, {
      sequelize,
      timestamps: false
    })
  }
}

module.exports = {
  ProjectAddress
}
