import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamLists } from '../../features/exam/examSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const ExamList = () => {
  const dispatch = useDispatch();
  const exams = useSelector((state) => state.exam.examList);
  const {courseId} = useParams();
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(fetchExamLists(courseId));
  }, [dispatch]);

  const handleAttemptExam=(exam)=>{
    console.log(courseId,exam)
    navigate('/exam-page',{state:{courseId,exam}})
  }
  return (
    <Container className="mt-4">
      <Row>
        {exams.length===0 && <p>No exams has been created.</p>}
        {exams.map((exam) => (
          <Col key={exam._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{exam.name}</Card.Title>
                <Card.Text>
                  <strong>Total Marks:</strong> {exam.totalMarks}
                </Card.Text>
                <Card.Text>
                  <strong>Pass Mark:</strong> {exam.passMark}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {exam.time} minutes
                </Card.Text>
                <Card.Text>
                  <strong>Questions:</strong> {exam.questions.length}
                </Card.Text>
                <Button variant="primary" onClick={()=>handleAttemptExam(exam)}>Attempt Now</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExamList;
