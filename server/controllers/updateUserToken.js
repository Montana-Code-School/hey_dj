var mongoose = require("mongoose");
const user = require("../models/user");

module.exports = {
  updateUserToken: async (req, res) => {
    const userKey = await user.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: req.body
      },
      { new: true }
    );
    return useyKey;
  }
};
