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
  putProject
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
  validatePutProject
} = require('../validations/project');

module.exports = async (fastify) => {
  fastify.delete('/project/:projectId', validateDeleteProject, deleteProject);
  fastify.delete('/project/:projectId/document/:documentId', validateDeleteProjectDocument, deleteProjectDocument)
  fastify.get('/project/:projectId', validateGetProject, getProject);
  fastify.get('/projects', validateGetProjects, getProjects);
  fastify.put('/project/:projectId', validatePutProject, putProject)
  fastify.post('/project', validatePostProject, postProject);
  fastify.post('/project/:projectId/document', validatePostProjectDocument, postProjectDocument);
  fastify.post('/project/:projectId/resend', validatePostProjectResend, postProjectResend);
  fastify.post('/project/copy/:projectId', validatePostCopyProject, postProjectCopy);
};
