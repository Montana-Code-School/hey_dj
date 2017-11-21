var mongoose = require("mongoose");

var Schema = mongoose.Schema;

//songs: ["Justin Beiber's Greatest Hit"],
var playlistSchema = mongoose.Schema({
  // songs: {
  //   type: Array,
  //   default: []
  // },
  songs: [{ type: String, default: "", required: false }],
  owner: { type: String, default: "", required: true },
  // owner should be an id
  musicSet: { type: String, default: "", required: true },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("playlist", playlistSchema);

/*
songs: [{ type: String, default: "", required: false }],
owner: { type: String, default: "", required: true },
// owner should be an id
music_set: { type: String, default: "", required: true },
created_date: { type: Date, default: Date.now, required: true }
*/
