var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var musicSetSchema = Schema({
  customValues: {
    releaseDate: Date,
    physiological: String,
    genre: String,
    emotion: String
  },
  title: { type: String, required: true },
  userId: { type: Schema.ObjectId, required: true }
});

var musicSet = mongoose.model("musicSet", musicSetSchema);

module.exports = musicSet;
