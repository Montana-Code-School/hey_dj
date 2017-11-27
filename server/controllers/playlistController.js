var Playlist = require("../models/playlist.js");

module.exports = {
  createPlaylist: async (req, res) => {
    const jams = await Playlist.create({
      songs: req.body.songs,
      musicSet: req.body.musicSet,
      owner: req.body.owner
    });
    jams.success = true;
    return jams;
  },

  addSongs: async (req, res) => {
    let jams;
    try {
      jams = await Playlist.findOne({ _id: req.body._id }).exec();
      jams.songs = jams.songs.concat(req.body.songs);
      await jams.save();
    } catch (e) {
      console.log("err", e);
      throw new Error(e.message);
    }
    jams.success = true;
    return jams;
  },

  editPlaylist: async (req, res) => {
    const jams = await Playlist.findOneAndUpdate(
      { _id: req.body._id },
      { songs: req.body.songs },
      { new: true, upsert: true }
    );
    jams.success = true;
    return jams;
  }
};
