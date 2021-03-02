const {
  Project,
  RoomSpecification,
  SpecificationCategory,
  SpecificationItem
} = require('../db/db');

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
  const { category, ...specificationItemData }  = req.body;

  try {
    const specificationItem = await SpecificationItem.create(specificationItemData);

    const [specificationCategory] = await SpecificationCategory.findOrCreate({
      where: {
        roomSpecificationId,
        type: category
      }
    })

    await specificationCategory.addItem(specificationItem)

    const roomSpecification = await RoomSpecification.findByPk(roomSpecificationId);

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

async function putSpecificationItem(req, res) {
  const { specificationItemId } = req.params;
  const { category, ...specificationItemData } = req.body;

  try {
    const specificationItem = await SpecificationItem.findByPk(specificationItemId);

    await specificationItem.update(specificationItemData);

    const specificationCategory = specificationCategory.findByPk(specificationItem.specificationCategoryId)

    if (specificationCategory.type !== category) {
      const [updatedSpecificationCategory] = await SpecificationCategory.findOrCreate({
        where: {
          roomSpecificationId: specificationCategory.roomSpecificationId,
          type: category,
        }
      })

      await updatedSpecificationCategory.addItem(specificationItem)
    }

    const roomSpecification = await RoomSpecification.findByPk(specificationCategory.roomSpecificationId);

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
