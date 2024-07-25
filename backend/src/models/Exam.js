const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  passMark: { type: Number, required: true },
  time: { type: Number, required: true },
  questions: [
    {
      question: { type: String, required: true },
      marks: { type: Number, required: true },
      options: [{ text: String, isCorrect: Boolean }],
    },
  ],
});

module.exports = mongoose.model('Exam', ExamSchema);
