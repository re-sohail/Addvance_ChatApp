const router = require("express").Router();
const authController = require("../controllers/auth.controllers");

// Sign up
router.post("/signup", authController.signup);

// Sign in
router.post("/signin", authController.signin);

// Sign out

module.exports = router;
