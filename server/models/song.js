const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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
  }
});

module.exports = mongoose.model("User", userSchema);
