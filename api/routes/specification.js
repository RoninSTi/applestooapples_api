const { putSpecification } = require('../controllers/specificationController');

const { validatePutSpecification } = require('../validations/specification');

module.exports = async (fastify) => {
  fastify.put('/specification/:roomSpecificationId', validatePutSpecification, putSpecification);
};
