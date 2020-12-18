const { User } = require('../models/User');

const validateGetMe = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
}

const validateGetUser = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }

      },
      required: ['id']
    }
  }
}

const validateGetUserAccount = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      }
    }
  }
}

const validatePutUser = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (request) {
      const { userId } = request.params;

      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error('User does not exist');
      }
    },
    async function (request) {
      const { userId } = request.params;
      const { id } = request.user;

      if (id !== userId) {
        throw new Error('Not allowed')
      }
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        avatar: { type: 'string', format: 'url' },
        companyName: { type: 'string' },
        email: { type: 'string', format: 'email' },
        name: { type: 'string' },
        phone: { type: 'string' },
        roles: { type: 'string' },
      }
    },
    params: {
      type: 'object',
      properties: {
        userId: { type: 'number' }
      },
      required: ['userId']
    }
  }
}

module.exports = {
  validateGetMe,
  validateGetUser,
  validateGetUserAccount,
  validatePutUser
}
