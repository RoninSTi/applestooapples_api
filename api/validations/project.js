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

const validateDeleteProjectDocument = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    params: {
      type: 'object',
      properties: {
        documentId: { type: 'number'},
        projectId: { type: 'number' }
      },
      required: ['documentId', 'projectId']
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

const validatePostProjectDocument = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        fileName: { type: 'string' },
        fileType: { type: 'string' },
        url: {
          type: 'string',
          format: 'url'
        }
      },
      required: ['fileName', 'fileType', 'url']
    },
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
}

const validatePostProjectResend = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        collaboratorId: { type: 'number'}
      },
      required: ['collaboratorId']
    },
    params: {
      type: 'object',
      properties: {
        projectId: { type: 'number' }
      },
      required: ['projectId']
    }
  }
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
  validateDeleteProjectDocument,
  validateGetProject,
  validateGetProjects,
  validatePostProject,
  validatePostProjectDocument,
  validatePostProjectResend,
  validatePostCopyProject,
  validatePutProject
}
