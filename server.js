const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const apisRouter = require("./routes/apis");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/-*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// process.env.MONGODB_URI
mongoose.connect("mongodb://127.0.0.1:27017/powerreact", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const { connection } = mongoose;
connection.once("open", () => {
  console.log("db connection created successfully");
});

app.use("/api", apisRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
