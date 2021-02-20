const validatePostSpecification = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        date: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              comments: { type: 'string'},
              cost: { type: 'number'},
              currency: { type: 'string'},
              date: { type: 'string' },
              description: { type: 'string' },
              dimensions: { type: 'string' },
              finish: { type: 'string' },
              item: { type: 'string' },
              manufacturer: { type: 'string' },
              material: { type: 'string' },
              model: { type: 'string' },
              phase: { type: 'string' },
              provided: { type: 'string' },
              qty: { type: 'number' },
              room: { type: 'string' },
              total: { type: 'number' },
              um: { type: 'string' },
            }
          }
        },
        room: {
          type: 'string',
          // enum: ['new', 'remodel']
        }
      },
      required: ['room'],
    },
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number'}
      },
      required:[ 'projectId']
    }
  },
}

const validatePutSpecification = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        date: { type: 'string' },
        items: {
          type: 'array',
          items: {
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
              manufacturer: { type: 'string' },
              material: { type: 'string' },
              model: { type: 'string' },
              phase: { type: 'string' },
              provided: { type: 'string' },
              qty: { type: 'number' },
              room: { type: 'string' },
              total: { type: 'number' },
              um: { type: 'string' },
            }
          }
        },
        room: {
          type: 'string',
          // enum: ['new', 'remodel']
        }
      },
      required: ['room'],
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

module.exports = {
  validatePostSpecification,
  validatePutSpecification
}
