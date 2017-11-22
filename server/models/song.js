const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  spotifyData: Object,
  customValues: Object,
  musicSetId: Schema.ObjectId
});

module.exports = mongoose.model("Song", userSchema);
