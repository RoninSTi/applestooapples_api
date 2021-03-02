const { Account, Address, Document, Project, ProjectAddress, ProjectUser, RoomSpecification, SpecificationItem, User } = require('../db/db');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6)
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');
const { } = require('../models/RoomSpecification');

// async function postCopySpecification(req, res) {
//   const { roomSpecificationId } = req.params;
//   const { type } = req.body;

//   try {
//     const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

//     const specificationItems

//   } catch (err) {
//     res.send(err)
//   }
// }

async function deleteSpecification(req, res) {
  const { roomSpecificationId } = req.params;

  try {
    const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

    const project = await Project.findByPk(roomSpecification.projectId);

    await roomSpecification.destroy();

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err);
  }
}

async function postSpecification(req, res) {
  const { projectId } = req.params;

  const { items, ...specificationData } = req.body;

  try {
    const project = await Project.findByPk(projectId);

    const roomSpecification = await RoomSpecification.create(specificationData);

    await roomSpecification.setProject(project);

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function putSpecification(req, res) {
  const { roomSpecificationId } = req.params
  const { items, ...specificationData } = req.body;

  try {
    const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

    await roomSpecification.update(specificationData);

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  deleteSpecification,
  postSpecification,
  putSpecification
}
