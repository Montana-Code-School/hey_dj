const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
const musicSet = require("./models/musicSet");
const { createMusicSet } = require("./controllers/createMusicSet");
mongoose.connect(config.db);
const {
  createPlaylist,
  addSongs,
  editPlaylist
} = require("./controllers/playlistController");
const { createUser, loginUser } = require("./controllers/userHandling");
const { postSong } = require("./controllers/songHandling");
const { protectionRoute } = require("./controllers/protected");
const path = require("path");
const routifyPromise = require("./controllers/util").routifyPromise;
const { getMusicSets } = require("./controllers/getMusicSets");
app.set("key", config.key);

var protectedRoute = express.Router();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", protectedRoute);

protectedRoute.use(protectedRoute);

app.post("/playlist", routifyPromise(createPlaylist));
app.put("/playlist", routifyPromise(addSongs));
app.post("/editPlaylist", routifyPromise(editPlaylist));

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/musicSet", routifyPromise(createMusicSet));

app.get("/username/:id", routifyPromise(getMusicSets));

app.post("/user", routifyPromise(createUser));

app.post("/authenticate", routifyPromise(loginUser(app)));

app.post("/songs", routifyPromise(postSong));

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.listen(config.port);
