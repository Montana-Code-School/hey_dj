const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const config = require("../../config");

//Password must be 8 characters long with 1 number, 1 uppercase letter & 1 special character

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: {
      validator: function(password) {
        return password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/
        );
      }
    },
    required: true
  },
  email: { type: String }
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    this.password = passwordHash.generate(this.password);
    return next();
  }
});

userSchema.methods.getToken = function(password) {
  console.log(
    password,
    this.password,
    passwordHash.verify(password, this.password)
  );
  if (passwordHash.verify(password, this.password)) {
    return jwt.sign(
      {
        username: this.username
      },
      config.key,
      {
        expiresIn: 60 * 60 * 1140
      }
    );
  } else {
    throw new Error("Passwords don't match");
  }
};

module.exports = mongoose.model("User", userSchema);
