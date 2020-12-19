const { Account, Document, Project, ProjectAddress, ProjectUser, User } = require('../db/db');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6)
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');


async function deleteProject(req, res) {
  const { projectId } = req.params;

  try {
    await Project.destroy({
      where: {
        id: projectId
      }
    });

    res.send('OK')
  } catch (error) {
    res.send(error);
  }
}

async function deleteProjectDocument(req, res) {
  const { documentId, projectId } = req.params

  try {
    await Document.destroy({
      where: {
        id: documentId
      }
    });

    const project = await Project.findByPk(projectId)

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function getProject(req, res) {
  const { projectId } = req.params;

  try {
    const project = await Project.findByPk(projectId);

    const response = await project.response();

    res.send(response)
  } catch (err) {
    res.send(err);
  }
}

async function getProjects(req, res) {
  const { account: { id: accountId }, id: userId } = req.user

  try {
    const accountProjects = await Project.findAll({
      where: {
        accountId,
      }
    });

    const projectUsers = await ProjectUser.findAll({
      where: {
        userId
      }
    });

    const userProjectIds = projectUsers.map(({ projectId }) => projectId)

    const userProjects = await Project.findAll({
      where: {
        id: userProjectIds
      }
    })

    const projects = [...accountProjects, ...userProjects]

    const projectResponses = projects.map(project => {
      return project.response()
    })

    const response = await Promise.all(projectResponses)

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function postProjectCopy(req, res) {
  const { projectId } = req.params

  try {
    const existingProject = await Project.findByPk(projectId)

    const existingJson = existingProject.toJSON();

    const { id, ...newData } = existingJson;

    const project = await Project.create({
      ...newData,
      name: `${newData.name} - Copy`,
      code: `${newData.type === 'remodel' ? 'R' : 'N'}-${nanoid()}`
    });

    const existingUsers = await ProjectUser.findAll({
      where: {
        projectId
      }
    });

    const newUsers = existingUsers.map(({ role, userId }) => {
      return ProjectUser.create({
        role,
        userId,
        projectId: project.id
      })
    });

    await Promise.all(newUsers);

    const existingAddresses = await ProjectAddress.findAll({
      where: {
        projectId
      }
    });

    const newAddresses = existingAddresses.map(({ type, addressId }) => {
      return ProjectAddress.create({
        type,
        addressId,
        projectId: project.id
      });
    });

    await Promise.all(newAddresses);

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err);
  }
}

async function postProject(req, res) {
  const { account: { id: accountId }} = req.user
  const { collaborators, addresses, startDate, ...data } = req.body;

  let projectId = null

  try {
    const project = await Project.create({
      ...data,
      startDate: new Date(startDate)
    });

    const account = await Account.findByPk(accountId)

    await project.setAccount(account)

    projectId = project.id

    await project.addProjectAddresses({ accountId: account.id, addresses })

    await project.addProjectCollaborators({ collaborators, mg: this.mg });

    const response = await project.response()

    res.send(response)
  } catch (error) {
    await Project.cleanup({ projectId })

    res.send(error)
  }
}

async function postProjectDocument(req, res) {
  const { projectId } = req.params;
  const documentData = req.body;

  try {
    const project = await Project.findByPk(projectId);

    const document = await Document.create({
      ...documentData
    });

    await document.setProject(project);

    const response = await project.response();

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function postProjectResend(req, res) {
  const { projectId } = req.params;
  const { collaboratorId } = req.body;

  try {
    // const user = await User.findByPk(collaboratorId);

    // const { email } = user;

    // await sendEmail({
    //   mg: this.mg,
    //   data: {
    //     to: email,
    //     template: 'collaborator_invite',
    //     'v:sign_in_url': `${nconf.get('app.authCallbackHost')}/login`,
    //     subject: 'Invitation to collaborate on an ApplesTooApples project',
    //   }
    // });

    const projectUser = await ProjectUser.findOne({
      where: {
        userId: collaboratorId,
        projectId
      }
    });

    await projectUser.update({
      invitationStatus: 'reminded'
    })

    const project = await Project.findByPk(projectId);

    const response = await project.response();

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function putProject(req, res) {
  const { account: { id: accountId } } = req.user

  const { projectId } = req.params;

  const { addresses, collaborators, ...projectData } = req.body;

  try {
    const project = await Project.findByPk(projectId);

    if (projectData) {
      await project.update({
        ...projectData,
      });
    }

    if (addresses) {
      await ProjectAddress.destroy({
        where: {
          projectId
        }
      });

      await project.addProjectAddresses({ accountId, addresses });
    }

    if (collaborators) {
      await ProjectUser.destroy({
        where: {
          projectId,
        }
      });

      await project.addProjectCollaborators({ collaborators, mg: this.mg });
    }

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  deleteProject,
  deleteProjectDocument,
  getProject,
  getProjects,
  postProject,
  postProjectCopy,
  postProjectDocument,
  postProjectResend,
  putProject
}
