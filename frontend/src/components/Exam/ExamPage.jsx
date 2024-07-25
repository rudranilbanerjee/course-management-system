import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { submitExam } from '../../features/exam/examSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Shared/LoadingSpinner';

const ExamPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(location.state===null){
        navigate('/memberdashboard')
    }
  },[])
  const [answers, setAnswers] = useState({});
  const { exam, courseId } = location.state;
  const { name, totalMarks, time, questions } = exam;

  const [timeLeft, setTimeLeft] = useState(0);

  const dispatch=useDispatch();

  useEffect(() => {
    // after refresh the page time was started from initial, to prevent this i store this end time into localstorage
    const storedEndTime = localStorage.getItem(`exam-${exam._id}-endTime`);
    const endTime = storedEndTime ? new Date(storedEndTime) : new Date(Date.now() + time * 60000);

    if (!storedEndTime) {
      localStorage.setItem(`exam-${exam._id}-endTime`, endTime);
    }

    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeLeft(timeDifference);

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        handleSubmit(); // Automatically submit the exam when time is up
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [exam, time]);


  const submitExamData = useSelector((state)=>state.exam)

  useEffect(()=>{
    if(submitExamData.error){
        
    }else{
        if(submitExamData.examResult?.isSuccess){
            navigate(`/exam-list/${courseId}`)
        }
    }
  },[submitExamData])


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(()=>{
    console.log(answers)
  },[answers])

  const handleChange = (questionId, optionId) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const handleSubmit = () => {
    localStorage.removeItem(`exam-${exam._id}-endTime`);
    const arr =Object.entries(answers).map(([questionId, selectedOption]) => ({ questionId, selectedOption })) 
    console.log(arr)
    dispatch(submitExam({ courseId:courseId, examId:exam._id, answers:arr }));
  };
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col><h4>Total Marks: {totalMarks}</h4></Col>
        <Col className="text-center"><h2>{name}</h2></Col>
        <Col className="text-right"><h4>Time: {formatTime(timeLeft)}</h4></Col>
      </Row>
      {questions.map((question, qIndex) => (
        <Card key={question._id} className="mb-4">
          <Card.Body>
            <Card.Title>Question {qIndex + 1}</Card.Title>
            <Card.Text>{question.question}</Card.Text>
            <Form>
              {question.options.map((option, oIndex) => (
                <Form.Check
                  key={oIndex}
                  type="radio"
                  id={`question-${qIndex}-option-${oIndex}`}
                  name={question._id}
                  label={option.text}
                  value={option._id} 
                  onChange={() => handleChange(question._id, option._id)}
                />
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}
      <Button variant="primary" className="mt-4" onClick={handleSubmit} disabled={submitExamData.loading}>
        {submitExamData.loading?<LoadingSpinner/>:'Submit'}
      </Button>
    </Container>
  );
};

export default ExamPage;
