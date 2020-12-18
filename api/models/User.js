const { Model } = require('sequelize');

const md5 = require('md5');

const crypto = require('crypto')

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      avatar: DataTypes.STRING,
      companyName: DataTypes.STRING,
      email: DataTypes.STRING(126).BINARY,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue('password')
        }
      },
      phone: DataTypes.STRING,
      roles: {
        type: DataTypes.TEXT,
        defaultValue: '["user"]',
        get: function () {
          return JSON.parse(this.getDataValue('roles'));
        },
        set: function (value) {
          this.setDataValue('roles', JSON.stringify(value));
        },
      },
      salt: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue('salt')
        }
      },
    }, {
        hooks: {
        afterCreate: function (user) {
          User.setDefaultAvatar(user)

          return user
        },
        beforeCreate: function (user) {
          User.setSaltAndPassword(user)

          return user
        },
        beforeUpdate: function (user) {
          User.setSaltAndPassword(user)

          return user
        }
      },
      indexes: [
        { unique: true, fields: ['email'] },
      ],
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    // this.memberAssociation = models.User.belongsTo(models.Account, {
    //   as: 'account',
    //   foreignKey: 'accountId'
    // });
  }

  static generateSalt() {
    return crypto.randomBytes(16).toString('base64')
  }

  static encryptPassword(plainText, salt) {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex')
  }

  static setDefaultAvatar(user) {
    const emailHash = md5(user.email.toLowerCase().trim());

    const avatar = `https://www.gravatar.com/avatar/${emailHash}?s=200&d=retro`

    user.avatar = avatar
  }

  static setSaltAndPassword(user) {
    if (user.changed('password')) {
      user.salt = User.generateSalt()
      user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  static async findOrCreateByEmail({ email, ...userData }) {
    const [user] = await this.findOrCreate({
      include: [{ all: true, nested: true }],
      where: { email }
    })

    if (userData) {
      Object
        .keys(userData)
        .forEach(key => {
          if (!user.getDataValue(key)) {
            user[key] = userData[key]
          } else {
            return null
          }
        })

      await user.save()
    }

    return user
  }

  correctPassword(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
  }
}

module.exports = {
  User
}
