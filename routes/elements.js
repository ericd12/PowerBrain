const router = require("express").Router();
const Element = require("../models/elementModel");
const Market = require("../models/element-dropdown-models/marketModel");
const Category = require("../models/element-dropdown-models/categoryModel");
const Format = require("../models/element-dropdown-models/formatModel");
const mongoose = require("mongoose");

var populateQuery = [
  { path: "elementMarket", model: Market },
  { path: "elementCategory", model: Category },
  { path: "elementFormat", model: Format },
];

router.route("/").get((req, res) => {
  Element.find()
    .populate(populateQuery)
    .exec((err, elements) => {
      res.send(elements);
    });
});

router.route("/add").post((req, res) => {
  const {
    elementNumber,
    elementLabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  } = req.body;

  const newElement = new Element({
    elementNumber,
    elementLabel,
    elementDescription,
    elementFormat,
    elementDuration,
    elementCategory,
    elementSubCategory,
    elementMarket,
    elementCogRating,
    elementPhysRating,
    elementLink,
  });

  newElement
    .save()
    .then(() => res.json("Element added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Element.findById(req.params.id)
    .populate(populateQuery)
    .exec((err, markets) => {
      res.send(markets);
    });
});

router.route("/:id").delete((req, res) => {
  Element.findByIdAndDelete(req.params.id)
    .then(() => res.json("Element deleted."))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").put((req, res) => {
  Element.findByIdAndUpdate(req.params.id, req.body)
    .then((res) => {
      res.send(err);
    })
    .catch((err) => res.send(err));
});

module.exports = router;
