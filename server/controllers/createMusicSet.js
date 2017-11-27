const musicSet = require("../models/musicSet");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = {
  createMusicSet: async (req, res) => {
    try {
      const newMusicSet = await musicSet.create({
        customValues: {
          releaseDate: req.body.releaseDate,
          physiological: req.body.physiological,
          genre: req.body.genre,
          emotion: req.body.emotion
        },
        title: req.body.title,
        userId: req.body.userId
      });
      return newMusicSet;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
