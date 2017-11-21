const Users = require("../models/user");

module.exports = {
  createUser: async (req, res) => {
    try {
      const user = await Users.create({
        username: req.body.username,
        password: req.body.password
      });
      user.success = true;
      return user;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  loginUser: app => async (req, res) => {
    const parseUserInfo = str =>
      new Buffer(str.split(" ")[1], "base64").toString().split(":");
    const [username, password] = parseUserInfo(req.headers["authorization"]);
    const user = await Users.findOne({ username }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    user.success = true;
    user.token = user.getToken(password);
    return user;
  }
};
