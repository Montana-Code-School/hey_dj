const musicSet = require("../models/musicSet");

module.exports = {
  createMusicSet: async (req, res) => {
    const newMusicSet = await musicSet.create({
      title: req.body.title,
      userId: req.body.userId
    });
    return newMusicSet;
  }
};
