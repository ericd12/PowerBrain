const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");


require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

mongoose.connect("mongodb://127.0.0.1:27017/powerbrain", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.set('useFindAndModify', false);

const { connection } = mongoose;
connection.once("open", () => {
  console.log("db connection created successfully");
});

const elementsRouter = require("./routes/elements");
const tracksRouter = require("./routes/tracks");
const programsRouter = require("./routes/programs");
const formatsRouter = require("./routes/formats");
const catsRouter = require("./routes/category");
const marketsRouter = require("./routes/markets");

app.use("/elements", elementsRouter);
app.use("/tracks", tracksRouter);
app.use("/programs", programsRouter);
app.use("/formats", formatsRouter);
app.use("/categories", catsRouter);
app.use("/markets", marketsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
