const { Account, Address, Document, Project, ProjectAddress, ProjectUser, RoomSpecification, SpecificationItem, User } = require('../db/db');

async function deleteSpecificationItem(req, res) {
  const { specificationItemId } = req.params;

  try {
    const specificationItem = await SpecificationItem.findByPk(specificationItemId);

    const roomSpecification = await RoomSpecification.findByPk(specificationItem.roomSpecificationId);

    await specificationItem.destroy();

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);

  } catch (err) {
    res.send(err);
  }
}

async function postSpecificationItem(req, res) {
  const { roomSpecificationId } = req.params;
  const specificationItemData = req.body;

  try {
    const specificationItem = await SpecificationItem.create(specificationItemData);

    const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

    await specificationItem.setRoomSpecification(roomSpecification);

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

async function putSpecificationItem(req, res) {
  const { specificationItemId } = req.params;

  try {
    const specificationItem = await SpecificationItem.findByPk(specificationItemId);

    await specificationItem.update(req.body);

    const roomSpecification = await RoomSpecification.findByPk(specificationItem.roomSpecificationId);

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  deleteSpecificationItem,
  postSpecificationItem,
  putSpecificationItem
}
