import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createExams } from '../../features/exam/examSlice';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
const initFormData = {
    name: '',
    totalMarks: '',
    passMark: '',
    time: '',
    questions: [],
}
const ExamForm = () => {
    const { courseId } = useParams()

    const [formData, setFormData] = useState({
        courseId: courseId,
        ...initFormData,
    });

    const dispatch = useDispatch();

    const examFormData = useSelector((state) => state.exam);

    useEffect(() => {
        if(examFormData.error){

        }else {
            setFormData((prev)=>({
                ...prev,
                ...initFormData
            }))
        }
    }, [examFormData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (index, e) => {
        const newQuestions = [...formData.questions];
        newQuestions[index][e.target.name] = e.target.value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].options[oIndex].text = e.target.value;
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleCorrectOptionChange = (qIndex, oIndex) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].options = newQuestions[qIndex].options.map((option, index) => ({
            ...option,
            isCorrect: index === oIndex,
        }));
        setFormData({ ...formData, questions: newQuestions });
    };

    const addQuestion = () => {
        setFormData({
            ...formData,
            questions: [
                ...formData.questions,
                { question: '', marks: '', options: [{ text: '', isCorrect: false }] },
            ],
        });
    };

    const addOption = (index) => {
        const newQuestions = [...formData.questions];
        newQuestions[index].options.push({ text: '', isCorrect: false });
        setFormData({ ...formData, questions: newQuestions });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createExams(formData));
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Create Exam</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCourseId">
                    <Form.Label>Course ID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter course ID"
                        name="courseId"
                        value={formData.courseId}
                        onChange={handleChange}
                        required
                        disabled={true}
                    />
                </Form.Group>
                <Form.Group controlId="formName">
                    <Form.Label>Examination Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter examination name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formTotalMarks">
                    <Form.Label>Total Marks</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter total marks"
                        name="totalMarks"
                        value={formData.totalMarks}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPassMark">
                    <Form.Label>Pass Mark</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter pass mark"
                        name="passMark"
                        value={formData.passMark}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formTime">
                    <Form.Label>Examination Time (in minutes)</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter examination time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                
                {formData.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mt-4">
                        <h5>Question {qIndex + 1}</h5>
                        <Form.Group controlId={`formQuestion${qIndex}`}>
                            <Form.Label>Question</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter question"
                                name="question"
                                value={question.question}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId={`formMarks${qIndex}`}>
                            <Form.Label>Marks</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter marks"
                                name="marks"
                                value={question.marks}
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                required
                            />
                        </Form.Group>
                        <Form.Label>Options</Form.Label>
                        {question.options.map((option, oIndex) => (
                            <InputGroup className="mb-3" key={oIndex}>
                                <InputGroup.Radio
                                    name={`correctOption${qIndex}`}
                                    checked={option.isCorrect}
                                    onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                                />
                                <Form.Control
                                    type="text"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                />
                            </InputGroup>
                        ))}
                        <Button variant="secondary" onClick={() => addOption(qIndex)}>
                            Add Option
                        </Button>
                    </div>
                ))}
                <Button variant="secondary" onClick={addQuestion}>
                    Add Question
                </Button>
                <Button variant="primary" type="submit">
                    Create Exam
                </Button>
            </Form>
        </Container>
    );
};

export default ExamForm;
