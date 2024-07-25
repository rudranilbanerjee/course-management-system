const express = require('express');
const { createCourse, listCourses, assignCourseToMember, getUnassignedMembers } = require('../controllers/courseController');
const auth = require('../middlewares/auth');
const { validateCourse,validateAssignCourse } = require('../validations/courseValidation');
const router = express.Router();

router.post('/create-course', auth('admin'), validateCourse, createCourse);
router.get('/list-course', auth(['member','admin']), listCourses);
router.post('/assign-course-member', auth('admin'), validateAssignCourse, assignCourseToMember);
router.get('/unassigned-members/:courseId', auth('admin'), getUnassignedMembers);
module.exports = router;
