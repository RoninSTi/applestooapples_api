const {
  deleteSpecification,
  putSpecification
} = require('../controllers/specificationController');

const { postSpecificationItem } = require('../controllers/specificationItemController');

const {
  validateDeleteSpecification,
  validatePutSpecification
} = require('../validations/specification');

const { validatePostSpecificationItem } = require('../validations/specificationItem');

module.exports = async (fastify) => {
  fastify.delete('/specification/:roomSpecificationId', validateDeleteSpecification, deleteSpecification);
  fastify.post('/specification/:roomSpecificationId/item', validatePostSpecificationItem, postSpecificationItem);
  fastify.put('/specification/:roomSpecificationId', validatePutSpecification, putSpecification);
};
