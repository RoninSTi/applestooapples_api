const { Model } = require('sequelize');

class Document extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      fileName: DataTypes.STRING,
      fileType: DataTypes.STRING,
      size: DataTypes.INTEGER,
      url: DataTypes.STRING
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.projectAssociation = models.Document.belongsTo(models.Project, {
      foreignKey: 'projectId'
    });
  }
}

module.exports = {
  Document
}

