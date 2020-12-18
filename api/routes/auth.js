const { getAuthSwoopCallback } = require('../controllers/authController');

module.exports = async (fastify) => {
  fastify.get('/auth/swoop/callback', getAuthSwoopCallback);
};
