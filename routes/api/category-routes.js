const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const catById = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(catById);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
  try {
    Category.create({ category_name: req.body.category_name });
    res
      .status(200)
      .json(`${req.body.category_name} has been added to the Category table.`);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          category_id: req.body.category_id,
        },
      }
    );
    res
      .status(200)
      .json(`Category with ID# ${req.body.category_id} has been updated `);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        category_id: req.body.category_id,
      },
    });
    res
      .status(200)
      .json(
        `Category with ID# ${req.body.category_id} has been deleted from the database.`
      );
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
