const validatePostSignedUrl = {
  preValidation: [
    async function (request) {
      return await request.jwtVerify()
    }
  ],
  schema: {
    body: {
      type: 'object',
      properties: {
        contentType: { type: 'string' },
        fileName: { type: 'string' },
      },
      required: ['contentType', 'fileName']
    }
  }
}

module.exports = {
  validatePostSignedUrl
}
