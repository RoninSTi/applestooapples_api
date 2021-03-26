const validateDeleteSpecificationItem = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        specificationItemId: { type: 'number' }
      },
      required: ['specificationItemId']
    }
  },
}

const validatePostSpecificationItem = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        comments: { type: 'string' },
        cost: { type: 'number' },
        currency: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
        dimensions: { type: 'string' },
        finish: { type: 'string' },
        item: { type: 'string' },
        item2: { type: 'string' },
        manufacturer: { type: 'string' },
        category: { type: 'string' },
        model: { type: 'string' },
        phase: { type: 'string' },
        provided: { type: 'string' },
        qty: { type: 'number' },
        room: { type: 'string' },
        total: { type: 'number' },
        um: { type: 'string' },
      },
      required: ['category']
    },
    params: {
      type: 'object',
      properties: {
        roomSpecificationId: { type: 'number' }
      },
      required: ['roomSpecificationId']
    }
  },
}

const validatePutSpecificationItem = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        comments: { type: 'string' },
        cost: { type: 'number' },
        currency: { type: 'string' },
        date: { type: 'string' },
        description: { type: 'string' },
        dimensions: { type: 'string' },
        finish: { type: 'string' },
        item: { type: 'string' },
        item2: { type: 'string' },
        manufacturer: { type: 'string' },
        category: { type: 'string' },
        model: { type: 'string' },
        phase: { type: 'string' },
        provided: { type: 'string' },
        qty: { type: 'number' },
        room: { type: 'string' },
        total: { type: 'number' },
        um: { type: 'string' },
      },
      required: ['category']
    },
    params: {
      type: 'object',
      properties: {
        specificationItemId: { type: 'number' }
      },
      required: ['specificationItemId']
    }
  },
}

module.exports = {
  validateDeleteSpecificationItem,
  validatePostSpecificationItem,
  validatePutSpecificationItem
}
