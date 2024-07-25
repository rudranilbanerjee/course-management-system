const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const validateExam = [
  check('courseId', 'Course ID is required').not().isEmpty(),
  check('name', 'Name is required').not().isEmpty(),
  check('totalMarks', 'Total marks are required').not().isEmpty(),
  check('passMark', 'Pass mark is required').not().isEmpty(),
  check('time', 'Examination time is required').not().isEmpty(),
  check('questions', 'Questions are required').isArray({ min: 1 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ isError:true, message: errors.array() });
    }
    next();
  },
];

const validateSubmitExam = [
  check('courseId')
    .notEmpty().withMessage('Course ID is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid Course ID'),
  check('examId')
    .notEmpty().withMessage('Exam ID is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('Invalid Exam ID'),
  check('answers')
    .isArray().withMessage('Answers must be an array')
    .notEmpty().withMessage('Answers are required'),

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
  validateExam,
  validateSubmitExam
};
