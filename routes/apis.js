const router = require("express").Router();


const elementsRouter = require("./elements");
const tracksRouter = require("./tracks");
const programsRouter = require("./programs");
const formatsRouter = require("./formats");
const catsRouter = require("./category");
const marketsRouter = require("./markets");


router.use("/elements", elementsRouter);
router.use("/tracks", tracksRouter);
router.use("/programs", programsRouter);
router.use("/formats", formatsRouter);
router.use("/categories", catsRouter);
router.use("/markets", marketsRouter);


module.exports = router
