const { Account, Address, Document, Project, ProjectAddress, ProjectUser, RoomSpecification, SpecificationItem, User } = require('../db/db');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6)
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');
const {  } = require('../models/RoomSpecification');


async function postSpecification(req, res) {
  const { projectId } = req.params;

  const { items, ...specificationData } = req.body;

  try {
    const project = await Project.findByPk(projectId);

    const roomSpecification = await RoomSpecification.create(specificationData);

    await roomSpecification.setProject(project);

    if (items && items.length > 0) {
      await roomSpecification.addItems({ items })
    }

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

    if (items && items.length > 0) {
      await SpecificationItem.destroy({
        where: {
          roomSpecificationId
        }
      });

      await roomSpecification.addItems({ items });
    }

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

module.exports = {
  postSpecification,
  putSpecification
}
