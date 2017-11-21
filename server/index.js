const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
const musicSet = require("../models/musicSet");
const { createMusicSet } = require("./controllers/createMusicSet");
mongoose.connect(config.db);
const path = require("path");
const routifyPromise = require("./controllers/util").routifyPromise;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/musicSet", routifyPromise(createMusicSet));

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.listen(config.port);
