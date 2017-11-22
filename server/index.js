const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const { createUser, loginUser } = require("./controllers/userHandling");
const { postSong } = require("./controllers/songHandling");
const { protectionRoute } = require("./controllers/protected");
const path = require("path");
const routifyPromise = require("./controllers/util").routifyPromise;

app.set("key", config.key);

var protectedRoute = express.Router();
app.use("/api", protectedRoute);

protectedRoute.use(protectedRoute);

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/user", routifyPromise(createUser));

app.post("/authenticate", loginUser(app));

app.post("/songs", routifyPromise(postSong));

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.listen(config.port);
