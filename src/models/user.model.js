const mongoose = require("mongoose");
const validator = require("validator");

// Schema Validation
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 3, maxLength: 50 },
  lastName: { type: String, maxLength: 50 },
  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 6,
    maxLength: 100,
    validate: (valuse) => {
      if (!validator.isEmail(valuse)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 100,
    select: false,
    validate: (value) => {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Password is not strong enough");
      }
    },
  },
  about: { type: String, maxLength: 50 },
  picture: { type: String },
  phoneNo: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
