var mongoose = require("mongoose");
const musicSet = require("../models/musicSet");

module.exports = {
  deleteMusicSet: async (req, res) => {
    const deletedSet = await musicSet.remove({ _id: req.params.id });
    return deletedSet;
  }
};
