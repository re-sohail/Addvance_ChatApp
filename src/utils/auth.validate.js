const validator = require("validator");
const userModle = require("../models/user.model");

const signupValidate = async (req, res) => {
  // empty array
  let arr = [];

  // destaructure the body data
  let { firstName, lastName, userName, email, password } = req.body;

  // Handle Incomming Values
  // Chcek Empty Fields
  if (!firstName || !userName || !email || !password) {
    arr.push("All fields are required");
  }

  // Check the length of the fields
  if (firstName.length < 3 || firstName.length > 50) {
    arr.push("First Name must be between 3 to 50 characters");
  }

  if (lastName.length < 3 || lastName.length > 50) {
    arr.push("Last Name must be between 3 to 50 characters");
  }

  if (userName.length < 3 || userName.length > 50) {
    arr.push("User Name must be between 3 to 50 characters");
  }

  if (email.length < 6 || email.length > 100) {
    arr.push("Email must be between 6 to 100 characters");
  }

  if (password.length < 8 || password.length > 100) {
    arr.push("Password must be between 8 to 100 characters");
  }

  // email validation
  if (!validator.isEmail(email)) {
    arr.push("Invalid Email");
  }

  // Password validation
  if (!validator.isStrongPassword(password)) {
    arr.push("Password is not strong enough");
  }

  // check if the user already exists
  let isUser = await userModle.findOne({ userName });
  if (isUser) {
    arr.push("User Name already exists");
  }

  let isEmail = await userModle.findOne({ email });
  if (isEmail) {
    arr.push("Email already exists");
  }

  // check if the array is empty
  if (arr.length > 0) {
    return { valid: false, error: arr };
  }

  // if all condition run sccessfully
  return { valid: true };
};

module.exports = { signupValidate };
