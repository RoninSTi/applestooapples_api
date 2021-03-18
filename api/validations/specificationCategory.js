const validateDeleteCategory = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        categoryId: { type: 'number' }
      },
      required: ['categoryId']
    }
  },
}

const validatePostCopyCategory = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        type: { type: 'string' }
      },
      required: ['type'],
    },
    params: {
      type: 'object',
      properties: {
        categoryId: { type: 'number' }
      },
      required: ['categoryId']
    }
  },
}

module.exports = {
  validateDeleteCategory,
  validatePostCopyCategory
}
