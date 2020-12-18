const Sequelize = require('sequelize');

const { Account } = require('../models/Account');
const { Address } = require('../models/Address');
const { Project } = require('../models/Project');
const { ProjectUser } = require('../models/ProjectUser')
const { ProjectAddress } = require('../models/ProjectAddress');
const { User } = require('../models/User');

const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  },
})

const models = {
  Account: Account.init(sequelize, Sequelize),
  Address: Address.init(sequelize, Sequelize),
  Project: Project.init(sequelize, Sequelize),
  ProjectUser: ProjectUser.init(sequelize, Sequelize),
  ProjectAddress: ProjectAddress.init(sequelize, Sequelize),
  User: User.init(sequelize, Sequelize)
}

Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize,
};
