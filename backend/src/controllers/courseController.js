const Course = require('../models/Course');
const User = require('../models/User');

const createCourse = async (req, res) => {
  const { name, description } = req.body;

  try {
    const course = new Course({ name, description });
    await course.save();
    res.status(200).json({ isSuccess: true, course });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ isError: true, message: err.message });
  }
};

const assignCourseToMember = async (req, res) => {
  const { courseId, memberId } = req.body;

  try {
    const course = await Course.findById(courseId);
    const member = await User.findById(memberId);

    if (!course || !member) {
      return res.status(404).json({ isError: true, message: 'Course or Member not found' });
    }

    course.members.push(member);
    await course.save();

    res.status(200).json({ isSuccess: true, message: 'Course assigned to member successfully' });
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ isError: true, message: err.message });
  }
};

const listCourses = async (req, res) => {
  //show all the list of courses to the admmin
  const { id, role } = req.user;

  try {
    if (role === 'admin') {
      const courses = await Course.find();
      res.status(200).json({ isSuccess: true, courses });
    } else if (role === 'member') {
      const courses = await Course.find({ members: id }).select('-exams -members'); // Exclude exams and members fields
      res.status(200).json({ isSuccess: true, courses });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ isError: true, message: err.message });
  }
};

const getUnassignedMembers = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate('members');
    if (!course) {
      return res.status(404).json({ isError: true, message: 'Course not found' });
    }


    const assignedMemberIds = course.members.map(member => member._id.toString());
    const unassignedMembers = await User.find({ role: 'member', _id: { $nin: assignedMemberIds } });


    res.status(200).json({ isSuccess: true, unassignedMembers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ isError: true, message: 'Server error' });
  }
};



module.exports = {
  createCourse,
  assignCourseToMember,
  listCourses,
  getUnassignedMembers
};
