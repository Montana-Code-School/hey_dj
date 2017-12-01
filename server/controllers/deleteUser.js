var mongoose = require("mongoose");
const user = require("../models/user");

module.exports = {
  deleteUser: async (req, res) => {
    const userProfile = await user.remove({ _id: req.params.id });
    return userProfile;
  }
};
