const { Account, Address, Document, Project, ProjectAddress, ProjectUser, RoomSpecification, SpecificationItem, User } = require('../db/db');
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('1234567890abcdef', 6)
const { sendEmail } = require('../adaptors/mailgunAdaptor')
const nconf = require('nconf');
const { } = require('../models/RoomSpecification');
const { SpecificationCategory } = require('../models/SpecificationCategory');

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

async function postAddSpecification(req, res) {
  const { projectId } = req.params;

  const { depth, sourceProjectId } = req.body;

  try {
    const project = await Project.findByPk(projectId)

    const sourceProject = await Project.findByPk(sourceProjectId)

    const roomSpecifications = await sourceProject.getSpecifications();

    await Promise.all(roomSpecifications.map(async (roomSpecification) => {
      const { room } = roomSpecification;

      const newRoomSpecification = await RoomSpecification.create({
        room
      });

      await newRoomSpecification.setProject(project);

      const specificationCategories = await SpecificationCategory.findAll({
        where: {
          roomSpecificationId: roomSpecification.id
        }
      });

      const newSpecificationCategoryPromises = specificationCategories.map(category => {
        const { total, type } = category;

        return SpecificationCategory.create({
          total: depth === 'full' ? total : 0,
          type,
        });
      });

      const newSpecificationCategories = await Promise.all(newSpecificationCategoryPromises);

      await newRoomSpecification.addCategories(newSpecificationCategories);

      if (depth === 'full') {
        await Promise.all(specificationCategories.map(async (category) => {
          const items = await category.getItems();

          await Promise.all(items.map(async (item) => {
            const { id, ...newData } = item.toJSON();

            const newItem = await SpecificationItem.create(newData);

            const newCategory = newSpecificationCategories.find(({ type }) => category.type === type);

            await newCategory.addItem(newItem);
          }))
        }));
      }
    }))

    const response = await project.response()

    res.send(response)
  } catch (err) {
    res.send(err)
  }
}

async function postCopySpecification(req, res) {
  const { roomSpecificationId } = req.params;
  const { depth, room } = req.body;

  try {
    const newRoomSpecification = await RoomSpecification.create({
      room
    });

    const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

    const project = await roomSpecification.getProject();

    await newRoomSpecification.setProject(project);

    const specificationCategories = await SpecificationCategory.findAll({
      where: {
        roomSpecificationId
      }
    });

    const newSpecificationCategoryPromises = specificationCategories.map(category => {
      const { total, type } = category;

      return SpecificationCategory.create({
        total: depth === 'full' ? total: 0,
        type
      });
    });

    const newSpecificationCategories = await Promise.all(newSpecificationCategoryPromises);

    await newRoomSpecification.addCategories(newSpecificationCategories);

    if (depth === 'full') {
      await Promise.all(specificationCategories.map(async (category) => {
        const items = await category.getItems();

        await Promise.all(items.map(async (item) => {
          const { id, ...newData } = item.toJSON();

          const newItem = await SpecificationItem.create(newData);

          const newCategory = newSpecificationCategories.find(({ type }) => category.type === type);

          await newCategory.addItem(newItem);
        }))
      }));
    }

    const response = await project.response();

    res.send(response);
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
  postAddSpecification,
  postCopySpecification,
  postSpecification,
  putSpecification
}
