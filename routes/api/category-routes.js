const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // gets all Categories
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
  // will throw a 404 error if the id does not exist
  const thisCategory = await Category.findByPk(req.params.id);

  if (thisCategory) {
    try {
      const catById = await Category.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
      res.status(200).json(catById);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(404).json(`Category with ID# ${req.params.id} does not exist.`);
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

router.put("/:id", async (req, res) => {
  // update a category by its `id` value

  const thisCategory = await Category.findByPk(req.params.id);

  if (thisCategory) {
    try {
      Category.update(
        {
          category_name: req.body.category_name,
        },
        {
          where: {
            category_id: thisCategory.category_id,
          },
        }
      );
      res
        .status(200)
        .json(
          `${thisCategory.category_name} Category name has been changed to ${req.body.category_name}`
        );
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(400)
      .json(
        `Category with ID# ${req.params.id} does not exist in the database.`
      );
  }
});

router.delete("/:id", async (req, res) => {
  const thisCategory = await Category.findByPk(req.params.id);
  // delete a category by its `id` value
  // if id does not exist will throw 404 error
  if (thisCategory) {
    try {
      Category.destroy({
        where: {
          category_id: thisCategory.category_id,
        },
      });
      res
        .status(200)
        .json(
          `${thisCategory.category_name} Category has been deleted from the database.`
        );
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(400)
      .json(
        `Category with ID# ${req.params.id} does not exist in the database.`
      );
  }
});

module.exports = router;
