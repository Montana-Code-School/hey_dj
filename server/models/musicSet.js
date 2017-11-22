var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var musicSetSchema = Schema({
  title: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true }
});

var musicSet = mongoose.model("musicSet", musicSetSchema);

module.exports = musicSet;
