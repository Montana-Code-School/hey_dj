var Playlist = require("../models/playlist.js");

module.exports = {
  createPlaylist: async (req, res) => {
    const jams = await Playlist.create({
      songs: req.body.songs,
      musicSet: req.body.musicSet,
      owner: req.body.owner
    }).toObject();
    console.log("jams is ", jams);
    jams.success = true;
    return jams;
  },

  addSongs: async (req, res) => {
    const jams = await Playlist.findOneAndUpdate(
      { _id: req.body._id },
      { songs: req.body.songs },
      { new: true, upsert: true }
    );
    jams.success = true;
    return jams;
  }

  //removeSongs: {}
};
