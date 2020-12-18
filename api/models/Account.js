const { Model, MEDIUMINT } = require('sequelize');

class Account extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      type: {
        type: DataTypes.ENUM,
        values: ['architect', 'collaborator', 'contractor', 'designer', 'homeowner']
      }
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.memberAssociation = models.Account.hasMany(models.User, {
      as: 'users',
      foreignKey: 'accountId'
    });
  }

  static async getSingle(id) {
    const account = await this.findByPk(id, { include: [{ all: true, nested: true }] });

    if (!account) return {}

    return account.toJSON();
  }

  async addAccountUser({ userData }) {
    const { User } = this.sequelize.models;

    const [user, created] = await User.findOrCreate({
      where: {
        ...userData
      }
    });

    if (created) {
      await this.addUser(user)
    } else {
      const { accountId } = user

      if (!accountId) {
        await this.addUser(user)
      } else {
        throw new Error('User already has account.')
      }
    }

    return user;
  }
}

module.exports = {
  Account
}

