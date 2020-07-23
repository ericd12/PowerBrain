const router = require("express").Router();
const Category = require("../models/element-dropdown-models/categoryModel");

router.route("/").get((req, res) => {
  Category.find()
    .then(cats => res.json(cats))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementCategory } = req.body;
  const newCategory = new Category({ elementCategory });

  newCategory
    .save()
    .then(() => res.json(`New 'Category' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Category.findById(req.params.id)
    .then(cats => res.json(cats))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.json("Category deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      category.elementCategory = req.body.elementCategory;

      category
        .save()
        .then(() => res.json("Element updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
