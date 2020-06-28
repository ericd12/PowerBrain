const router = require("express").Router();
const Element = require("../models/elementModel");
const mongoose = require("mongoose");

router.route("/").get((req, res) => {
  Element.find()
    .then(elements => res.json(elements))
    .catch(err => res.status(400).json(`Error: ${err}`));
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

      // const run = async () => {
    //   const newElement = await Element.create({
    //     elementCategory: mongoose.Types.ObjectId()
    //   })
    //   console.log(newElement)
    // }
    // run()
  
    
    // console.log(`newElement: ${newElement}`)

  newElement
    .save()
    .then(() => res.json("Element added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Element.findById(req.params.id)
    .then(element => res.json(element))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Element.findByIdAndDelete(req.params.id)
    .then(() => res.json("Element deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").put((req, res) => {
  Element.findByIdAndUpdate(req.params.id, req.body);
  // .then(response => {
  //   const {
  //     elementNumber,
  //     elementLabel,
  //     elementDescription,
  //     elementFormat,
  //     elementDuration,
  //     elementCategory,
  //     elementSubCategory,
  //     elementMarket,
  //     elementCogRating,
  //     elementPhysRating,
  //     elementLink,
  //   } = req.body;

  //   const element = {
  //     ...response,
  //     elementNumber,
  //     elementLabel,
  //     elementDescription,
  //     elementFormat,
  //     elementDuration,
  //     elementCategory,
  //     elementSubCategory,
  //     elementMarket,
  //     elementCogRating,
  //     elementPhysRating,
  //     elementLink,
  //   };

  //   element
  //     .save()
  //     .then(() => res.json("Element updated!"))
  //     .catch(err => res.status(400).json(`Error: ${err}`));
  // })
  // .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
