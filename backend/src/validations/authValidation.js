const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('gender', 'Gender is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array())
      return res.status(400).json({ isError:true, message: errors.array() });
    }
    next();
  },
];

const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ isError:true, message: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateRegister,
  validateLogin,
};
