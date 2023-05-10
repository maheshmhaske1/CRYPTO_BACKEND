const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
      type: String,
      default: ''
  },
  last_name: {
      type: String,
      default: ''
  },
  email: {
      type: String,
      default: ''
  },
  mobile: {
      type: Number,
      default: ''
  },
  password: {
      type: String,
      default: ''
  },
  token: {
      type: String
  },
})


module.exports = mongoose.model("user", userSchema);
