var mongoose = require("mongoose");
var Schema = mongoose.Schema;

async function uniqueTitleByUser(musicSetName) {
  const musicSets = await musicSet.find({ userId: this.userId });
  const titles = musicSets.map(obj => obj.title);
  return titles.indexOf(musicSetName) === -1 ? true : false;
}

var musicSetSchema = Schema({
  title: {
    type: String,
    required: true,
    validate: [uniqueTitleByUser, "title must be unique"]
  },
  userId: { type: Schema.Types.ObjectId, required: true }
});

var musicSet = mongoose.model("musicSet", musicSetSchema);

module.exports = musicSet;
