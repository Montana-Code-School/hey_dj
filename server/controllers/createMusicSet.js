const musicSet = require("../../models/musicSet");

module.exports = {
  createMusicSet: async (req, res) => {
    try {
      const newMusicSet = await musicSet.create({
        title: req.body.title,
        userID: req.body.userID
      });
      musicSet.success = true;
      return newMusicSet;
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
