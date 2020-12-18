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
    this.memberAssociation = models.Account.hasMany(models.Address, {
      as: 'addresses',
      foreignKey: 'addressId',
    });
  }
}

module.exports = {
  Address
}

