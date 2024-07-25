const express = require('express');
const { createExam, listExams, submitExam } = require('../controllers/examController');
const auth = require('../middlewares/auth');
const { validateExam,validateSubmitExam } = require('../validations/examValidation');

const router = express.Router();

router.post('/create-exam', auth('admin'), validateExam, createExam);
router.get('/exam-list-by-courseId/:courseId', auth(['admin', 'member']), listExams);
router.post('/submit-exam', auth('member'),validateSubmitExam, submitExam);


module.exports = router;
