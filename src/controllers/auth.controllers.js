const { signupValidate, signinValidate } = require("../utils/auth.validate");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    // Validate the user input (helpper function)
    let { valid, error } = await signupValidate(req, res);
    if (!valid) {
      return res.status(400).json({
        message: error,
        status: 400,
        success: false,
      });
    }

    // destaructure the body data
    let { firstName, lastName, userName, email, password } = req.body;

    // Hash the password
    let gentSalt = 10;
    let hasPassword = await bcrypt.hash(password, gentSalt);

    // create a new user
    let userData = new userModel({
      firstName,
      lastName,
      userName,
      email,
      password: hasPassword,
    });

    await userData.save();

    return res.status(200).json({
      data: userData,
      message: "User Created Successfully",
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Inetrnal Server issue",
      status: 500,
      success: false,
    });
  }
};

const signin = async (req, res) => {
  try {
    // email and password
    let { valid, error } = await signinValidate(req, res);
    if (!valid) {
      return res.status(400).json({
        message: error,
        status: 400,
        success: false,
      });
    }
    let { email, password } = req.body;

    // check if the email exist
    let isUser = await userModel.findOne({ email });
    if (!isUser) {
      return res.status(404).json({
        message: "Invalid Email or Password",
        status: 404,
        success: false,
      });
    }

    // check if the password is correct
    let isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      return res.status(404).json({
        message: "Invalid Email or Password",
        status: 404,
        success: false,
      });
    }

    // token genrate {JWT}
    // (data), (secret key), (options)
    const token = await jwt.sign(
      {
        id: isUser._id,
        name: isUser.name,
        email: isUser.email,
      },
      process.env.JWT_SCRET,
      {
        expiresIn: "7d",
      }
    );

    // genrate the cookies
    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login Successfully",
      status: 200,
      success: true,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Inetrnal Server issue",
      status: 500,
      success: false,
    });
  }
};

module.exports = { signup, signin };
