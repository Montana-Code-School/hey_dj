const Song = require("../models/song");

module.exports = {
  postSong: async (req, res) => {
    // try {
    const song = await Song.create({
      musicSetId: req.body._id,
      spotifyId: req.body.spotifyId,
      title: req.body.title,
      artist: req.body.artist,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
      physiological: req.body.physiological,
      emotion: req.body.emotion
    });
    song.success = true;
    return song;
    // } catch (e) {
    //   throw new Error(e.message);
    // }
  }
};
