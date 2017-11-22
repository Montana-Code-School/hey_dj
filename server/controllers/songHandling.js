const Song = require("../models/song");

module.exports = {
  postSong: async (req, res) => {
    try {
      const song = await Song.create({
        spotifyData: req.body.spotifyData,
        customValues: req.body.customValues,
        musicSetId: req.body.musicSetId
      });
      song.success = true;
      return song;
    } catch (e) {
      console.log(e.message);
      throw new Error(e.message);
    }
  }
};
