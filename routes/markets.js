const router = require("express").Router();
const Market = require("../models/element-dropdown-models/marketModel");

router.route("/").get((req, res) => {
  Market.find()
    .then(markets => res.json(markets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { elementMarket } = req.body;
  const newMarket = new Market({ elementMarket });

  newMarket
    .save()
    .then(() => res.json(`New 'Market' added!`))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Market.findById(req.params.id)
    .then(markets => res.json(markets))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Market.findByIdAndDelete(req.params.id)
    .then(() => res.json("Market deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").post((req, res) => {
  Market.findById(req.params.id)
    .then(market => {
      market.elementMarket = req.body.elementMarket;

      market
        .save()
        .then(() => res.json("Market updated!"))
        .catch(err => res.status(400).json(`Error: ${err}`));
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
