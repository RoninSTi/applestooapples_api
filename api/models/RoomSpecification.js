const { Model } = require('sequelize');
const { sendEmail } = require('../adaptors/mailgunAdaptor')

class RoomSpecification extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      date: DataTypes.DATE,
      room: {
        type: DataTypes.ENUM,
        values: [
          'barn',
          'basement',
          'bathroom1',
          'bathroom2',
          'bathroom3',
          'bathroom4',
          'bathroom5',
          'bathroom6',
          'bedroom1',
          'bedroom2',
          'bedroom3',
          'bedroom4',
          'bedroom5',
          'bedroom6',
          'bedroom7',
          'bunk',
          'butler',
          'craft',
          'den',
          'dining',
          'entry',
          'gameroom',
          'garage',
          'ghbathr1',
          'ghbathr2',
          'ghbedr1',
          'ghbedr2',
          'ghkitchen',
          'ghlaundry',
          'ghliving',
          'ghpatio',
          'homegym',
          'kitchen',
          'laundry',
          'library',
          'living',
          'loft',
          'masterbedroom1',
          'masterbedroom2',
          'masterbedroomcloset1',
          'masterbedroomcloset2',
          'media',
          'mud',
          'office1',
          'office2',
          'pantry',
          'patio1',
          'patio2',
          'playroom',
          'phbathroom',
          'phbedroom',
          'phkitchen',
          'phlaundry',
          'phliving',
          'phoutdoorshower',
          'phpatio',
          'porch',
          'powder',
          'relaxation',
          'studio',
          'sun',
          'wine',
          'other'
        ]
      },
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.projectAssociation = models.RoomSpecification.belongsTo(models.Project, {
      foreignKey: 'projectId'
    });

    this.specificationItemAssociation = models.RoomSpecification.hasMany(models.SpecificationItem, {
      as: 'items',
      foreignKey: 'roomSpecificationId'
    });
  }

  async addItems({ items }) {
    const { SpecificationItem } = this.sequelize.models;

    const specificationItemPromises = items.map(item => SpecificationItem.create(item))

    const specificationItems = await Promise.all(specificationItemPromises)

    await this.setItems(specificationItems);
  }
}

module.exports = {
  RoomSpecification
}

