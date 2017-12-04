var mongoose = require("mongoose");
const user = require("../models/user");

module.exports = {
  updateProfile: async (req, res) => {
    const userProfile = await user.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      },
      { new: true }
    );
    return userProfile;
  }
};
