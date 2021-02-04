const { Model } = require('sequelize');

class Address extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      address: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      companyName: DataTypes.STRING,
      country: DataTypes.STRING,
      name: DataTypes.STRING,
      namePrefix: DataTypes.STRING,
      nameSuffix: DataTypes.STRING,
      mailstop: DataTypes.STRING,
      postalCode: DataTypes.STRING,
      state: DataTypes.STRING,
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.accountAssociation = models.Address.belongsTo(models.Account, {
      foreignKey: 'accountId',
    });

    this.projectAddressAssociation = models.Address.belongsToMany(models.Project, {
      through: 'ProjectAddress',
      foreignKey: 'addressId'
    });
  }
}

module.exports = {
  Address
}

