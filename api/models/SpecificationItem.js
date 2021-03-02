const { Model } = require('sequelize');

class SpecificationItem extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      comments: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
      currency: {
        type: DataTypes.ENUM,
        values: ['USD', 'CAD', 'GBP', 'EUR']
      },
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      dimensions: DataTypes.STRING,
      finish: DataTypes.STRING,
      item: DataTypes.STRING,
      manufacturer: DataTypes.STRING,
      model: DataTypes.STRING,
      phase: {
        type: DataTypes.ENUM,
        values: ['pre', 'demo', 'site', 'framing', 'mechanical', 'trim', 'finish']
      },
      provided: {
        type: DataTypes.ENUM,
        values: ['contractor', 'designer', 'owner']
      },
      qty: DataTypes.INTEGER,
      room: DataTypes.STRING,
      total: DataTypes.DECIMAL,
      um: DataTypes.STRING,
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.specificationCategoryAssociation = models.SpecificationItem.belongsTo(models.SpecificationCategory, {
      foreignKey: 'specificationCategoryId'
    });
  }
}

module.exports = {
  SpecificationItem
}
