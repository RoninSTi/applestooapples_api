const { Account } = require('../db/db')

const validateDeleteAccount = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { roles } = req.user

      const isEmployee = roles.some(role => role === 'employee')

      if (!isEmployee) throw new Error('Unauthorized.')
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        accountId: {
          type: 'number'
        },
      },
      required: ['accountId']
    }
  }
};

const validateDeleteAccountUser = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { account } = req.user
      const { accountId } = req.params

      const canAccess = account.id === accountId

      if (!canAccess) {
        throw new Error('Not a member of the account')
      }
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        accountId: {
          type: 'number'
        },
        userId: {
          type: 'number'
        }
      },
      required: ['accountId', 'userId']
    }
  }
};

const validateGetAccounts = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    querystring: {
      page: { type: 'number' },
      pageSize: { type: 'number' },
    }
  }
};

const validateGetAccountsMe = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ]
};



const validateGetPaymentMethod = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { accounts } = req.user
      const { accountId } = req.params

      const canAccess = accounts.some(account => account.accountId === accountId)

      if (!canAccess) {
        throw new Error('Not a member of the account')
      }
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        accountId: {
          type: 'number'
        },
      },
      required: ['accountId']
    }
  }
}

const validateGetSubscription = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { accounts } = req.user
      const { accountId } = req.params

      const canAccess = accounts.some(account => account.accountId === accountId)

      if (!canAccess) {
        throw new Error('Not a member of the account')
      }
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        accountId: {
          type: 'number'
        },
      },
      required: ['accountId']
    }
  }
}

const validatePostAccount = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        type: { type: 'string', enum: ['architect', 'collaborator', 'contractor', 'designer', 'homeowner'] }
      },
      required: ['type'],
    },
  },
}

const validatePostAccountUserAdd = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { account } = req.user
      const { accountId } = req.params

      const canAccess = account.accountId = accountId

      if (!canAccess) {
        throw new Error('Not a member of the account')
      }
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        firstName: { type: 'string' },
        lastName: { type: 'string' }
      },
      required: ['email']
    },
    params: {
      type: 'object',
      properties: {
        accountId: { type: 'number'}
      },
      required: ['accountId']
    }
  }
}

const validatePutAccount = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { accounts, roles } = req.user
      const { accountId } = req.params

      const isEmployee = roles.some(role => role === 'employee')

      if (!isEmployee) {
        const canAccess = accounts.some(account => account.accountId === accountId)

        if (!canAccess) {
          throw new Error('Not a member of the account')
        }
      }
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        contactName: { type: ['string', 'null'] },
        email: {
          type: ['string', 'null'],
          format: 'email'
        },
        image: { type: ['string', 'null'], format: 'url' },
        name: { type: ['string', 'null'] },
        placeId: { type: ['string', 'null'] },
        phone: { type: ['string', 'null']  }
      }
    },
    params: {
      type: 'object',
      properties: {
        accountId: { type: 'number' }
      },
      required: ['accountId']
    }
  },
}

const validatePutAccountUser = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }
    },
    async function (req) {
      const { account } = req.user
      const { accountId } = req.params

      const canAccess = account.id === accountId

      if (!canAccess) {
        throw new Error('Not a member of the account')
      }
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        role: {
          type: 'string', enum: ['admin', 'super-admin'] }
      }
    },
    params: {
      type: 'object',
      properties: {
        accountId: { type: 'number' },
        userId: { type: 'number' }
      },
      required: ['accountId', 'userId']
    }
  }
}

module.exports = {
  validateDeleteAccount,
  validateDeleteAccountUser,
  validateGetAccounts,
  validateGetAccountsMe,
  validateGetPaymentMethod,
  validateGetSubscription,
  validatePostAccount,
  validatePostAccountUserAdd,
  validatePutAccount,
  validatePutAccountUser
}
