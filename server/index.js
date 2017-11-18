const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("../config");
const mongoose = require("mongoose");
mongoose.connect(config.db);
const { createUser, loginUser } = require("./controllers/userHandling");
const { protectionRoute } = require("./controllers/protected");
const path = require("path");

app.set("key", config.key);

var protectedRoute = express.Router();
app.use("/api", protectedRoute);

protectedRoute.use(protectedRoute);

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/user", createUser);

app.post("/authenticate", loginUser(app));

app.use(express.static("build"));
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "../build")));

app.listen(config.port);
