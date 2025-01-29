const joi = require("joi");

const SignupValidation = joi.object({
  firstName: joi.string().required().min(3).max(50).messages({
    "string.base": "First Name must String",
    "string.empty": "First Name connot be empty",
    "string.min": "First Name must be at least 3 charachter",
    "string.max": "First Name must be less then 50 charachter",
    "any.required": "First Name is required",
  }),

  lastName: joi.string().optional().max(50).messages({
    "string.base": "Last Name must String",
    "string.empty": "Last Name connot be empty",
    "string.min": "Last Name must be at least 3 charachter",
    "string.max": "Last Name must be less then 50 charachter",
    "any.required": "Last Name is required",
  }),

  userName: joi
    .string()
    .required()
    .min(3)
    .max(50)
    .invalid(["admin", "super admin", "test", "organzation"]) // preserved keyword
    .custom((value, helper) => {
      // regix , pattern
      const allowedUserName = /^[0-9A-Za-z]{6,16}$/;
      if (!allowedUserName.test(value)) {
        return helper.message("User name not valid");
      }
    })
    .message({
      "string.base": "User Name must String",
      "string.empty": "User Name connot be empty",
      "string.min": "User Name must be at least 3 charachter",
      "string.max": "User Name must be less then 50 charachter",
      "any.required": "User Name is required",
    }),

  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "org", "io", "in"] },
    })
    .min(6)
    .max(100)
    .required()
    .lowercase()
    .trim()
    .normalize()
    .message({
      "string.base": "Email must String",
      "string.empty": "Email connot be empty",
      "string.min": "Email must be at least 3 charachter",
      "string.max": "Email must be less then 50 charachter",
      "any.required": "Email is required",
      "string.email": "Email must be Valid email adress",
    }),
});

module.exports = {
  SignupValidation,
};
