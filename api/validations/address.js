const { Account, Address } = require('../db/db');

const validateDeleteAddress = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId, addressId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }

      const address = await Address.findByPk(addressId);

      if (!address) {
        throw new Error('Address does not exist');
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
        accountId: { type: 'number' },
        addressId: { type: 'number' }
      },
      required: ['accountId', 'addressId']
    }
  }
}

const validateGetAddresses = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ]
}

const validatePostAddress = {
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
        address: { type: 'string' },
        address2: { type: 'string' },
        city: { type: 'string' },
        companyName: { type: 'string' },
        country: { type: 'string' },
        name: { type: 'string' },
        namePrefix: { type: 'string' },
        nameSuffix: { type: 'string' },
        mailstop: { type: 'string' },
        postalCode: { type: 'string' },
        state: { type: 'string' },
      }
    },
    params: {
      type: 'object',
      properties: {
        accountId: { type: 'number' },
      },
      required: ['accountId']
    }
  }
}

const validatePutAddress = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  preHandler: [
    async function (req) {
      const { accountId, addressId } = req.params;

      const account = await Account.findByPk(accountId);

      if (!account) {
        throw new Error('Account does not exist');
      }

      const address = await Address.findByPk(addressId);

      if (!address) {
        throw new Error('Address does not exist');
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
        address: { type: 'string' },
        address2: { type: 'string' },
        city: { type: 'string' },
        companyName: { type: 'string' },
        country: { type: 'string' },
        name: { type: 'string' },
        namePrefix: { type: 'string' },
        nameSuffix: { type: 'string' },
        mailstop: { type: 'string' },
        postalCode: { type: 'string' },
        state: { type: 'string' },
      }
    },
    params: {
      type: 'object',
      properties: {
        accountId: { type: 'number' },
        addressId: { type: 'number' }
      },
      required: ['accountId', 'addressId']
    }
  }
}

module.exports = {
  validateDeleteAddress,
  validateGetAddresses,
  validatePostAddress,
  validatePutAddress,
}
