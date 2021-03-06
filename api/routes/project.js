const { validate } = require('uuid');
const {
  deleteProject,
  deleteProjectDocument,
  getProject,
  getProjects,
  postProject,
  postProjectCopy,
  postProjectDocument,
  postProjectResend,
  putProject,
  putProjectAddress
} = require('../controllers/projectController');
const {
  validateDeleteProject,
  validateDeleteProjectDocument,
  validateGetProject,
  validateGetProjects,
  validatePostCopyProject,
  validatePostProject,
  validatePostProjectDocument,
  validatePostProjectResend,
  validatePutProject,
  validatePutProjectAddress
} = require('../validations/project');

const {
  postAddSpecification,
  postSpecification
} = require('../controllers/specificationController')
const {
  validatePostAddSpecification,
  validatePostSpecification
} = require('../validations/specification')

module.exports = async (fastify) => {
  fastify.delete('/project/:projectId', validateDeleteProject, deleteProject);
  fastify.delete('/project/:projectId/document/:documentId', validateDeleteProjectDocument, deleteProjectDocument)
  fastify.get('/project/:projectId', validateGetProject, getProject);
  fastify.get('/projects', validateGetProjects, getProjects);
  fastify.post('/project', validatePostProject, postProject);
  fastify.post('/project/:projectId/document', validatePostProjectDocument, postProjectDocument);
  fastify.post('/project/:projectId/resend', validatePostProjectResend, postProjectResend);
  fastify.post('/project/copy/:projectId', validatePostCopyProject, postProjectCopy);
  fastify.post('/project/:projectId/addspecification', validatePostAddSpecification, postAddSpecification);
  fastify.post('/project/:projectId/specification', validatePostSpecification, postSpecification);
  fastify.put('/project/:projectId', validatePutProject, putProject);
  fastify.put('/project/:projectId/address/:addressId', validatePutProjectAddress, putProjectAddress)
};
