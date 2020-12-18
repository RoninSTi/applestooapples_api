const { deleteAddress, getAddresses, postAddress, putAddress } = require('../controllers/addressController');
const { validateDeleteAddress, validateGetAddresses, validatePostAddress, validatePutAddress } = require('../validations/address');

module.exports = async (fastify) => {
  fastify.delete('/account/:accountId/address/:addressId', validateDeleteAddress, deleteAddress);
  fastify.get('/addresses', validateGetAddresses, getAddresses);
  fastify.post('/account/:accountId/address', validatePostAddress, postAddress);
  fastify.put('/account/:accountId/address/:addressId', validatePutAddress, putAddress);
};
