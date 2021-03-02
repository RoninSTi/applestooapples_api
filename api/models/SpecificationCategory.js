const { Model } = require('sequelize');

class SpecificationCategory extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      total: DataTypes.DECIMAL,
      type: {
        type: DataTypes.ENUM,
        values: ['plumbing', 'hardware', 'lighting', 'finishes', 'stone', 'appliances', 'accessories', 'upholstery', 'furnishings']
      },
    }, {
      sequelize,
      timestamps: false
    })
  }

  static associate(models) {
    this.roomSpecificationAssociation = models.SpecificationCategory.belongsTo(models.RoomSpecification, {
      foreignKey: 'roomSpecificationId'
    });

    this.specificationItemAssociation = models.SpecificationCategory.hasMany(models.SpecificationItem, {
      as: 'items',
      foreignKey: 'specificationCategoryId'
    });
  }
}

module.exports = {
  SpecificationCategory
}
