import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../../features/result/fetchResults';

const ExamResultList = () => {
    const { resultList } = useSelector((state) => state.results);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchResults({}));
    }, [])
    const { data } = useSelector((state) => state.auth);

    return (
        <Container className="mt-4">
            <Row>
                {resultList.map((result, index) => (
                    <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{result.exam.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{result.course.name}</Card.Subtitle>
                                {data.role === 'admin' && <Card.Text>
                                    <strong>Member Name:</strong> {result.user.name}
                                </Card.Text>}
                                <Card.Text>
                                    <strong>Marks Obtained:</strong> {result.marksObtained}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Result:</strong> {result.pass ? <Badge bg="success">Pass</Badge> : <Badge bg="danger">Fail</Badge>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ExamResultList;
