const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  spotifyData: { required: true, type: Array },
  customValues: Array,
  musicSetId: { required: true, type: Schema.ObjectId }
});

module.exports = mongoose.model("Song", userSchema);
