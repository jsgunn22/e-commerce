const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  const thisTag = await Tag.findByPk(req.params.id);

  if (thisTag) {
    try {
      res.status(200).json(thisTag);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(404)
      .json(`Tag with ID#${req.params.id} does not exist in the database.`);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
  try {
    Tag.create(req.body);
    res.status(200).json(req.body);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const thisTag = await Tag.findByPk(req.params.id);

  if (thisTag) {
    try {
      Tag.update(req.body, { where: { tag_id: thisTag.tag_id } });
    } catch (err) {
      res.status(err).json(err);
    }
  } else {
    res
      .status(404)
      .json(`Tag with ID#${req.params.id} does not exist in the database.`);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const thisTag = await Tag.findByPk(req.params.id);

  if (thisTag) {
    try {
      Tag.destroy({ where: { tag_id: thisTag.tag_id } });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(404)
      .json(`Tag with ID#${req.params.id} does not exist in the database.`);
  }
});

module.exports = router;
