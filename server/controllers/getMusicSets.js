var mongoose = require("mongoose");
const musicSet = require("../models/musicSet");

module.exports = {
  getMusicSets: async (req, res) => {
    const musicSets = await musicSet.find({ userId: req.params.id });
    return musicSets;
  }
};
