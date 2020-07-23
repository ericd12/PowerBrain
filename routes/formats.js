const router = require("express").Router();
const Format = require("../models/element-dropdown-models/formatModel");

router.route("/").get((req, res) => {
  Format.find()
    .then(formats => res.json(formats))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementFormat } = req.body;
  const newFormat = new Format({ elementFormat });

  newFormat
    .save()
    .then(() => res.json(`New 'Format' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Format.findById(req.params.id)
    .then(markets => res.json(markets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Format.findByIdAndDelete(req.params.id)
    .then(() => res.json("Format deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Format.findById(req.params.id)
    .then(market => {
      market.elementFormat = req.body.elementFormat;

      market
        .save()
        .then(() => res.json("Format updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
