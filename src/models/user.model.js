const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9_]*$/.test(value);
      },
      message:
        "Invalid Username Format (only letters, numbers, and underscores)",
    },
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
    // select: false,
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

// password compare
userSchema.methods.comparePassword = async function (commingPassword) {
  const isPassword = await bcrypt.compare(commingPassword, this.password);
  return isPassword;
};

// create jwt token
userSchema.methods.generateToken = async function () {
  const token = await jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.JWT_SCRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

module.exports = mongoose.model("User", userSchema);
