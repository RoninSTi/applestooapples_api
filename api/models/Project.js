const { Model } = require('sequelize');
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');

class Project extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      closedDate: DataTypes.DATE,
      code: DataTypes.STRING,
      isClosed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      name: DataTypes.STRING,
      scope: DataTypes.STRING,
      size: {
        type: DataTypes.ENUM,
        values: ['sm', 'md', 'lg', 'xl']
      },
      startDate: DataTypes.DATE,
      type: {
        type: DataTypes.ENUM,
        values: ['new', 'remodel']
      },
    }, {
      sequelize,
      timestamps: true
    })
  }

  static associate(models) {
    this.accountAssociation = models.Project.belongsTo(models.Account, {
      foreignKey: 'accountId'
    });

    this.addressAssociation = models.Project.belongsToMany(models.Address, {
      through: 'ProjectAddress',
      as: 'addresses',
      foreignKey: 'projectId',
      otherKey: 'addressId',
    });

    this.userAssociation = models.Project.belongsToMany(models.User, {
      through: 'ProjectUser',
      as: 'users',
      foreignKey: 'projectId',
      otherKey: 'userId',
    });
  }

  static async cleanup({ projectId }) {
    await this.destroy({
      where: {
        id: projectId
      }
    })
  }

  static async getSingle(id) {
    const project = await this.findByPk(id, { include: [{ all: true, nested: true }] });

    if (!project) return {}

    return project.toJSON();
  }

  async addProjectAddresses({ accountId, addresses }) {
    if (!addresses) return;

    const { Account, Address, ProjectAddress } = this.sequelize.models;

    const account = await Account.findByPk(accountId);

    const addressesToCreate = []

    const existingAddresses = addresses.map(address => {
      const { id, type } = address;

      if (id) {
        return ProjectAddress.create({
          addressId: id,
          projectId: this.id,
          type
        })
      } else {
        addressesToCreate.push(address);

        return undefined
      }
    }).filter(el => el !== undefined)

    await Promise.all(existingAddresses)

    const newAddresses = addressesToCreate.map(async address => {
      const { save, type, ...addressData } = address

      const newAddress = await Address.create({ ...addressData })

      if (save) {
        await account.addAddresses([newAddress])
      }

      return ProjectAddress.create({
        addressId: newAddress.id,
        projectId: this.id,
        type
      })
    })

    await Promise.all(newAddresses)
  }

  async addProjectCollaborators({ collaborators, mg }) {
    const { Account, ProjectUser, User } = this.sequelize.models;

    const projectAccountsToCreate = collaborators.map(async collaborator => {
      const { email, firstName, invitationStatus, lastName, role } = collaborator

      const [user, created] = await User.findOrCreate({
        where: {
          email
        }
      })

      if (created) {
        user.firstName = firstName

        user.lastName = lastName

        await user.save()

        const account = await Account.create({
          isActive: true,
          type: 'collaborator'
        })

        await account.addUser(user)

        return ProjectUser.create({
          invitationStatus,
          userId: user.id,
          projectId: this.id,
          role
        })
      } else {
        const { accountId } = user

        if (accountId) {
          return ProjectUser.create({
            invitationStatus,
            userId: user.id,
            projectId: this.id,
            role
          })
        } else {
          const account = await Account.create({
            isActive: true,
            type: 'collaborator'
          })

          await account.addUser(user)

          return ProjectUser.create({
            invitationStatus,
            userId: user.id,
            projectId: this.id,
            role
          })
        }
      }
    });

    const projectUsers = await Promise.all(projectAccountsToCreate)

    const projectUsersToInvite = projectUsers
      .map(({ userId, invitationStatus }) => invitationStatus === 'draft' ? userId : undefined)
      .filter(el => el !== undefined);

    // const usersToInvite = await User.findAll({
    //   where: {
    //     id: projectUsersToInvite
    //   }
    // });

    // const emails = usersToInvite.map(({ email }) => {
    //   return sendEmail({
    //     mg,
    //     data: {
    //       to: email,
    //       template: 'collaborator_invite',
    //       'v:sign_in_url': `${nconf.get('app.authCallbackHost')}/login`,
    //       subject: 'Invitation to collaborate on an ApplesTooApples project',
    //     }
    //   });
    // });

    // await Promise.all(emails);

    await ProjectUser.update({
      invitationStatus: 'pending'
      }, {
      where: {
        userId: projectUsersToInvite
      }
    });
  }

  async response() {
    const { Address, Document, ProjectAddress, ProjectUser, User } = this.sequelize.models;

    const projectUsers = await ProjectUser.findAll({
      include: [{ all: true, nested: true }],
      where: {
        projectId: this.id
      }
    })

    const collaboratorIds = []

    const userMap = {}

    projectUsers.forEach(({ invitationStatus, userId, role }) => {
      collaboratorIds.push(userId);

      userMap[userId] = {
        invitationStatus,
        role,
      }
    })

    const collaborators = await User.findAll({
      where: {
        id: collaboratorIds
      }
    })

    const collaboratorResponse = collaborators.map(collaborator => ({
      ...collaborator.toJSON(),
      ...userMap[collaborator.id]
    }))

    const projectAddresses = await ProjectAddress.findAll({
      include: [{ all: true, nested: true }],
      where: {
        projectId: this.id
      }
    })

    const addressIds = []

    const typeMap = {}

    projectAddresses.forEach(({ type, addressId }) => {
      addressIds.push(addressId)
      typeMap[addressId] = type
    })

    const addresses = await Address.findAll({
      where: {
        id: addressIds
      }
    })

    const addressResponse = addresses.map(address => ({
      ...address.toJSON(),
      type: typeMap[address.id]
    }));

    const documents = await Document.findAll({
      where: {
        projectId: this.id
      }
    });

    const documentResponse = documents.map(document => document.toJSON())

    const response = {
      ...this.toJSON(),
      addresses: addressResponse,
      collaborators: collaboratorResponse,
      documents: documentResponse
    }

    return response
  }
}

module.exports = {
  Project
}

