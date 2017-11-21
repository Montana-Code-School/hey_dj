var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//have to give it an actual userID
var musicSetSchema = Schema({
  title: { type: String, required: true },
  userID: { type: Number, required: true }
});

var musicSet = mongoose.model("musicSet", musicSetSchema);

module.exports = musicSet;
