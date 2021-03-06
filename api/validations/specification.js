const validateDeleteSpecification = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        roomSpecificationId: { type: 'number' }
      },
      required: ['roomSpecificationId']
    }
  },
}

const validatePostAddSpecification = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        sourceProjectId: { type: 'number' },
        depth: { type: 'string' }
      },
      required: ['depth'],
    },
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  },
}

const validatePostCopySpecification = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        room: { type: 'string' },
        depth: { type: 'string' }
      },
      required: ['depth', 'room'],
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
        room: { type: 'string' }
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
        room: { type: 'string' }
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
  validateDeleteSpecification,
  validatePostAddSpecification,
  validatePostCopySpecification,
  validatePostSpecification,
  validatePutSpecification
}
