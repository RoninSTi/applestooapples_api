const {
  deleteSpecification,
  putSpecification,
  postCopySpecification,
} = require('../controllers/specificationController');

const { postSpecificationItem } = require('../controllers/specificationItemController');

const {
  validateDeleteSpecification,
  validatePostCopySpecification,
  validatePutSpecification
} = require('../validations/specification');

const { validatePostSpecificationItem } = require('../validations/specificationItem');

module.exports = async (fastify) => {
  fastify.delete('/specification/:roomSpecificationId', validateDeleteSpecification, deleteSpecification);
  fastify.post('/specification/:roomSpecificationId/item', validatePostSpecificationItem, postSpecificationItem);
  fastify.post('/specification/:roomSpecificationId/copy', validatePostCopySpecification, postCopySpecification);
  fastify.put('/specification/:roomSpecificationId', validatePutSpecification, putSpecification);
};
