const validateDeleteProject = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
}

const validateGetProject = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
}

const validateGetProjects = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
}

const validatePostCopyProject = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
}

const validatePostProject = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        collaborators: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email'
              },
              invite: { type: 'boolean' },
              name: { type: 'string' },
              role: {
                type: 'string',
                enum: [
                  'architect',
                  'civil',
                  'contractor',
                  'designer',
                  'geotech',
                  'homeowner',
                  'landscape',
                  'lighting',
                  'structural'
                ]
              }
            }
          }
        },
        addresses: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              save: { type: 'boolean' },
              type: {
                type: 'string',
                enum: [
                  'mailing',
                  'material',
                  'project'
                ]
              }
            }
          }
        },
        code: { type: 'string' },
        name: { type: 'string' },
        scope: { type: 'string' },
        size: {
          type: 'string',
          enum: ['sm', 'md', 'lg', 'xl']
        },
        startDate: { type: 'string' },
        type: {
          type: 'string',
          enum: ['new', 'remodel']
        }
      },
      required: ['type'],
    },
  },
}

const validatePutProject = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
}

module.exports = {
  validateDeleteProject,
  validateGetProject,
  validateGetProjects,
  validatePostProject,
  validatePostCopyProject,
  validatePutProject
}
