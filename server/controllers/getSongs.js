var mongoose = require("mongoose");
const song = require("../models/song");

module.exports = {
  getSongs: async (req, res) => {
    const songs = await song.find({ musicSetId: req.params.id });
    return songs;
  }
};
