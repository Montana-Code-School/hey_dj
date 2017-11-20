var Users = require("../models/user");
var jwt = require("jsonwebtoken");
var passwordHash = require("password-hash");

module.exports = {
  createUser: async (req, res) => {
    const user = await Users.create({
      username: req.body.username,
      password: req.body.password
    });
    user.success = true;
    return user;
  },
  loginUser: app => (req, res) => {
    console.log(req.headers["authorization"]);
    var auth = req.headers["authorization"];
    var tmp = auth.split(" ");
    var buf = new Buffer(tmp[1], "base64");
    var plain_auth = buf.toString();
    var creds = plain_auth.split(":");
    var username = creds[0];
    var password = creds[1];
    Users.findOne(
      {
        username: username
      },
      (err, user) => {
        if (err) throw err;
        if (!user) {
          res.json({
            success: false,
            message: "Authentication failed. User not found."
          });
        } else if (user.username) {
          if (!passwordHash.verify(password, user.password)) {
            res.json({
              success: false,
              message: "Authentication failed. Wrong password."
            });
          } else {
            const payload = {
              username: user.username
            };
            var token = jwt.sign(payload, app.get("key"), {
              expiresIn: 60 * 60 * 1140
            });

            res.json({
              success: true,
              message: "Validation successful",
              token: token
            });
          }
        }
      }
    );
  }
};
