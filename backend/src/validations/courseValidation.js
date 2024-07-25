const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const validateCourse = [
  check('name', 'Name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ isError:true, message: errors.array() });
    }
    next();
  },
];

const validateAssignCourse = [
  check('courseId')
    .notEmpty().withMessage('Course ID is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid Course ID'),
  check('memberId')
    .notEmpty().withMessage('Member ID is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid Member ID'),

  // Middleware to check the validation result
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ isError: true, errors: errors.array() });
    }
    next();
  }
];


module.exports = {
  validateCourse,
  validateAssignCourse
};
