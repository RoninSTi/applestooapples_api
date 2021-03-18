const { Project, RoomSpecification, SpecificationCategory, SpecificationItem } = require("../db/db");

async function deleteCategory(req, res) {
  const { categoryId } = req.params;

  try {
    const specificationCategory = await SpecificationCategory.findByPk(categoryId);

    const roomSpecification = await RoomSpecification.findByPk(specificationCategory.roomSpecificationId);

    await specificationCategory.destroy();

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

async function postCopyCategory(req, res) {
  const { categoryId } = req.params;
  const { type } = req.body;

  try {
    const specificationCategory = await SpecificationCategory.findByPk(categoryId);

    const items = await specificationCategory.getItems();

    const newSpecificationCategory = await SpecificationCategory.create({ type });

    const roomSpecification = await RoomSpecification.findByPk(specificationCategory.roomSpecificationId);

    await roomSpecification.addCategories([newSpecificationCategory]);

    await Promise.all(items.map(async (item) => {
      const { id, ...newData } = item.toJSON();

      const newItem = await SpecificationItem.create(newData);

      await newSpecificationCategory.addItem(newItem);
    }));

    const project = await Project.findByPk(roomSpecification.projectId);

    const response = await project.response();

    res.send(response);
  } catch (err) {
    res.send(err);
  }
}

module.exports = {
  deleteCategory,
  postCopyCategory
}
