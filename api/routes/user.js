const {
  validateGetMe,
  validateGetUser,
  validateGetUserAccount,
  validatePutUser
} = require('../validations/user');
const {
  getMe,
  getUser,
  getUserAccount,
  putUser
} = require('../controllers/userController');

module.exports = async (fastify) => {
  fastify.get('/user/:id', validateGetUser, getUser);
  fastify.get('/user/:id/account', validateGetUserAccount, getUserAccount);
  fastify.get('/user/me', validateGetMe, getMe)
  fastify.put('/user/:userId', validatePutUser, putUser);
};
