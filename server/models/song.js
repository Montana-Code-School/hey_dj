const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  musicSetId: { required: true, type: Schema.ObjectId },
  spotifyId: String,
  title: String,
  artist: String,
  releaseDate: String,
  genre: String,
  physiological: String,
  emotion: String
});

module.exports = mongoose.model("Song", userSchema);
