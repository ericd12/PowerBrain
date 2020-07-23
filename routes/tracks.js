const router = require("express").Router();
const Track = require("../models/trackModel");

router.route("/").get((req, res) => {
  Track.find({})
    .then(tracks => res.json(tracks))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  const { trackNumber, trackName, trackInfo } = req.body;

  const newTrack = new Track({
    trackNumber,
    trackName,
    trackInfo,
  });

  newTrack
    .save()
    .then(() => res.json("Track added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").get((req, res) => {
  Track.findById(req.params.id)
    .then(track => res.json(track))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/:id").delete((req, res) => {
  Track.findByIdAndDelete(req.params.id)
    .then(() => res.json("Track deleted."))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route("/update/:id").put((req, res) => {
  Track.findByIdAndUpdate(req.params.id, req.body).then(res => {
    res.send(err)
  }).catch(err => res.send(err));

  // Track.findById(req.params.id)
  //   .then(track => {
  //     track.trackNumber = req.body.trackNumber;
  //     track.trackName = req.body.trackName;
  //     track.trackInfo = req.body.trackInfo;
  //     track
  //       .save()
  //       .then(() => res.json("Track updated!"))
  //       .catch(err => res.status(400).json(`Error: ${err}`));
  //   })
  //   .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
