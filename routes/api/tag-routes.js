const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Tag not found!" });
        return;
      }
      res.json({ message: "GET SUCCESSFULLY!", tagData });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR!", error });
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Tag not found with this id!" });
        return;
      }
      res.json({ message: "GET SUCCESSFULLY!", tagData });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR!", error });
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Please enter your data" });
        return;
      }
      res.json({ message: "CREATE SUCCESSFULLY!", tagData });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR!", error });
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Tag not found with this id!" });
        return;
      }
      res.json({ message: "UPDATE SUCCESSFULLY!", tagData });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR!", error });
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "Tag not found with this id!" });
        return;
      }
      res.json({ message: "DELETE SUCCESSFULLY!", tagData });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR!", error });
    });
});

module.exports = router;
