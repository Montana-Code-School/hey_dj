const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const path = require("path");
const createPlaylist = require("./controllers/createPlaylist");
const routifyPromise = require("./controllers/util").routifyPromise;
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var db = mongoose.connection;
var msaMongoDb =
  process.env.MONGODB_URI || "mongodb://localhost:27017/playlist";
mongoose.connect(msaMongoDb, {
  useMongoClient: true
});

db.on("error", console.error.bind(console, "MongoDB connection error:"));
app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.post("/create/playlist", routifyPromise(createPlaylist.createPlaylist));
app.listen(config.port);
