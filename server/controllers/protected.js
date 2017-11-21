module.exports = {
  protectedRoute: (req, res, next) => {
    var token = req.headers["authorization"];
    if (token) {
      jwt.verify(token, app.get("key"), function(err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: "Failed to authenticate token."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: "No token provided."
      });
    }
  }
};
