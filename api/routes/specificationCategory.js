const {
  deleteCategory,
  postCopyCategory
} = require('../controllers/specificationCategoryController');

const {
  validateDeleteCategory,
  validatePostCopyCategory
} = require('../validations/specificationCategory');

module.exports = async (fastify) => {
  fastify.delete('/specificationcategory/:categoryId', validateDeleteCategory, deleteCategory);
  fastify.post('/specificationcategory/:categoryId/copy', validatePostCopyCategory, postCopyCategory);
};
