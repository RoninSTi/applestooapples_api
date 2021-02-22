const {
  deleteSpecificationItem,
  putSpecificationItem
} = require('../controllers/specificationItemController');

const {
  validateDeleteSpecificationItem,
  validatePutSpecificationItem
} = require('../validations/specificationItem');

module.exports = async (fastify) => {
  fastify.delete('/specificationitem/:specificationItemId', validateDeleteSpecificationItem, deleteSpecificationItem);
  fastify.put('/specificationitem/:specificationItemId', validatePutSpecificationItem, putSpecificationItem);
};
