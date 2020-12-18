const {
  deleteProject,
  getProject,
  getProjects,
  postProject,
  postProjectCopy,
  postProjectResend,
  putProject
} = require('../controllers/projectController');
const {
  validateDeleteProject,
  validateGetProject,
  validateGetProjects,
  validatePostCopyProject,
  validatePostProject,
  validatePostProjectResend,
  validatePutProject
} = require('../validations/project');

module.exports = async (fastify) => {
  fastify.delete('/project/:projectId', validateDeleteProject, deleteProject);
  fastify.get('/project/:projectId', validateGetProject, getProject);
  fastify.get('/projects', validateGetProjects, getProjects);
  fastify.put('/project/:projectId', validatePutProject, putProject)
  fastify.post('/project', validatePostProject, postProject);
  fastify.post('/project/:projectId/resend', validatePostProjectResend, postProjectResend);
  fastify.post('/project/copy/:projectId', validatePostCopyProject, postProjectCopy)
};
