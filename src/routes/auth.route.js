const router = require("express").Router();
const userModle = require("../models/user.model");
const { signupValidate } = require("../utils/auth.validate");
const bcrypt = require("bcryptjs");

// 1. Error Catching Middleware (try, catch)
// 2. Handle Incomming Values (user Input)
// 3. Edge Cases (Validation)
// 4. Helper Functions (Validation)
// 5. Sanitezation (Clean the data)
// 6. Password Hashing (bcryptjs)
// 7. Save the data to the database

// Sign up
router.post("/signup", async (req, res) => {
  try {
    // Validate the user input (helpper function)
    let { valid, error } = await signupValidate(req, res);
    if (!valid) {
      return res.status(400).json({
        message: error,
        status: 400,
      });
    }

    // destaructure the body data
    let { firstName, lastName, userName, email, password } = req.body;

    // Hash the password
    let gentSalt = 10;
    let hasPassword = await bcrypt.hash(password, gentSalt);

    // create a new user
    let userData = new userModle({
      firstName,
      lastName,
      userName,
      email,
      password: hasPassword,
    });

    await userData.save();

    return res.send(userData);
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Inetrnal Server issue",
      status: 500,
    });
  }
});

// Sign in
router.get("/signin", (req, res) => {
  res.send("Hello World");
});
// Sign out

module.exports = router;
