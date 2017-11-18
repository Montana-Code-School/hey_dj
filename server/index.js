const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
const musicSet = require("./models/musicSet");
mongoose.connect(config.db);
const path = require("path");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/musicSet", (req, res) => {
  var newMusicSet = new MusicSet({
    title: req.body.title,
    userID: req.body.userID
  });
  newMusicSet.save((err, result)  => {
    if err {
      response.status(500).json(err)
    }else {
      res.json(result);
    }
  })
});

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.listen(config.port);
