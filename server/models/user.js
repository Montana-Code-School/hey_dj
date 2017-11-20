const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordHash = require("password-hash");

const userSchema = new Schema({
  username: String,
  password: String
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = passwordHash.generate(this.password);
    return next();
  }
});

module.exports = mongoose.model("User", userSchema);
