const { Model } = require('sequelize');

class ProjectUser extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      invitationStatus: {
        type: DataTypes.ENUM,
        defaultValue: 'draft',
        values: [
          'accepted',
          'draft',
          'pending',
          'reminded',
          'unasked',
        ]
      },
      userId: DataTypes.INTEGER,
      projectId: DataTypes.INTEGER,
      role: {
        type: DataTypes.ENUM,
        values: [
          'architect',
          'civil',
          'contractor',
          'designer',
          'geotech',
          'homeowner',
          'landscape',
          'lighting',
          'structural'
        ]
      }
    }, {
      sequelize,
      timestamps: false
    })
  }
}

module.exports = {
  ProjectUser
}
