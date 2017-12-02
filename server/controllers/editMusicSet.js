var mongoose = require("mongoose");
const musicSet = require("../models/musicSet");

module.exports = {
  editMusicSet: async (req, res) => {
    const editedSet = await musicSet.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      },
      { new: true }
    );
    return editedSet;
  }
};
