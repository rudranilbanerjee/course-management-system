const Course = require('../models/Course');
const Exam = require('../models/Exam');
const Result = require('../models/Result');
const { calculatePassFail } = require('../utils/helpers');

const createExam = async (req, res) => {
    const { courseId, name, totalMarks, passMark, time, questions } = req.body;

    //there question is come as form of array where inside question all the item have three fields like question, marks, options 
    //where options also contain an array and inside array all the item have two fields first one is text, isCorrect. 

    try {
        const exam = new Exam({ name, totalMarks, passMark, time, questions });
        await exam.save();

        const course = await Course.findById(courseId);
        course.exams.push(exam);// store this exam id inside the exams field as an array element in the course collection.   
        await course.save();

        res.status(200).json({ isSuccess: true, exam });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ isError: true, message: err.message });
    }
};

const listExams = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId).populate('exams');
        res.status(200).json({ isSuccess: true, exams: course.exams });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ isError: true, message: err.message });
    }
};

const submitExam = async (req, res) => {
    const { courseId, examId, answers } = req.body;

    try {
        const exam = await Exam.findById(examId);
        const user = req.user.id;

        let marksObtained = 0;

        exam.questions.forEach((question, index) => {
            const userAnswer = answers.find(answer => answer.questionId === question._id.toString());
            if (userAnswer && question.options.find(option => option._id.toString() === userAnswer.selectedOption && option.isCorrect)) {
                marksObtained += question.marks;
            }
        });

        const pass =calculatePassFail(marksObtained,exam.passMark);

        const result = new Result({
            course: courseId,
            exam: exam._id,
            user,
            marksObtained,
            pass
        });

        await result.save();

        res.status(200).json({isSuccess:true,result});
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ isError: true, message: err.message });
    }
};

module.exports = {
    createExam,
    listExams,
    submitExam
};
