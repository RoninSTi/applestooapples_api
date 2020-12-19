const { validatePostSignedUrl } = require('../validations/upload');
const { postUploadSignedUrl } = require('../controllers/uploadController');

module.exports = async (fastify) => {
  fastify.post('/upload/signedurl/', validatePostSignedUrl, postUploadSignedUrl);
};
