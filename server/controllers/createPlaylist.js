var playlist = require("../models/playlist.js");

module.exports = {
  createPlaylist: async (req, res) => {
    const jams = (await playlist.create({
      songs: req.body.songs,
      musicSet: req.body.musicSet,
      owner: req.body.owner
    })).toObject();

    jams.success = true;
    return jams;
  }
};
