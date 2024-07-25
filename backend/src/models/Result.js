const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  },
  pass: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Result', ResultSchema);