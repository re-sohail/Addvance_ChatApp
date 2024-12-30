const validator = require("validator");
const userModle = require("../models/user.model");

const signupValidate = async (req, res) => {
  // Handle Incomming Values

  // destaructure the body data
  let { firstName, lastName, userName, email, password } = req.body;

  // Chcek Empty Fields
  if (!firstName || !userName || !email || !password) {
    return { valid: false, error: "All fields are required" };
  }

  // Check the length of the fields
  if (firstName.length < 3 || firstName.length > 50) {
    return {
      valid: false,
      error: "First Name must be between 3 to 50 characters",
    };
  }

  if (lastName.length < 3 || lastName.length > 50) {
    return {
      valid: false,
      error: "Last Name must be between 3 to 50 characters",
    };
  }

  if (userName.length < 3 || userName.length > 50) {
    return {
      valid: false,
      error: "User Name must be between 3 to 50 characters",
    };
  }

  if (email.length < 6 || email.length > 100) {
    return {
      valid: false,
      error: "Email must be between 6 to 100 characters",
    };
  }

  if (password.length < 8 || password.length > 100) {
    return {
      valid: false,
      error: "Password must be between 8 to 100 characters",
    };
  }

  // email validation
  if (!validator.isEmail(email)) {
    return { valid: false, error: "Invalid Email" };
  }

  // Password validation
  if (!validator.isStrongPassword(password)) {
    return { valid: false, error: "Password is not strong enough" };
  }

  // check if the user already exists
  let isUser = await userModle.findOne({ userName });
  if (isUser) {
    return { valid: false, error: "User Name already exists" };
  }

  let isEmail = await userModle.findOne({ email });
  if (isEmail) {
    return { valid: false, error: "Email already exists" };
  }

  // if all condition run sccessfully
  return { valid: true };
};

const signinValidate = async (req, res) => {
  // Handle Incoming Values
  let { email, password } = req.body;

  // Check Empty Fields
  if (!email || !password) {
    return { valid: false, error: "All fields are required" };
  }

  if (email.length < 6 || email.length > 100) {
    return { valid: false, error: "Email must be between 6 to 100 characters" };
  }

  if (password.length > 100) {
    return {
      valid: false,
      error: "Password must be between 8 to 100 characters",
    };
  }
  // Email Validation
  if (!validator.isEmail(email)) {
    return { valid: false, error: "Invalid Email" };
  }

  // if all condition run sccessfully
  return { valid: true };
};

module.exports = { signupValidate, signinValidate };
