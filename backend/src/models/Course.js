const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  exams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exam' }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Course', CourseSchema);
