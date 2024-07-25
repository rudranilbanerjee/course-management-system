import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assignedCourse, fetchCourses, fetchNotAssignedMember, resetCourseSliceInfo } from '../../features/course/courseSlice';
import { Container, Row, Col, Card, ListGroup, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';
const initPopupData = {
  courseId: '',
  show: false,
}
const CourseList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.course.courseList);
  const [popupData, setPopupData] = useState(initPopupData);
  const [membersId, setMembersId] = useState('')

  const courseData = useSelector((state) => state.course)
  const authData = useSelector((state) => state.auth.data)


  useEffect(() => {
    dispatch(fetchCourses({}));
  }, [dispatch]);

  const handleAddMember = (courseId) => {
    setPopupData({
      courseId: courseId,
      show: true,
    });
  }

  useEffect(() => {
    if (courseData.error) {

    } else {
      if (courseData.info?.isSuccess) {
        //show some success message
        handleClose();
        dispatch(resetCourseSliceInfo())
      }
    }
  }, [courseData])

  useEffect(() => {
    if (popupData.show) {
      dispatch(fetchNotAssignedMember(popupData.courseId))
    }
  }, [popupData])

  const handleClose = () => {
    setPopupData(initPopupData)
    setMembersId('')
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(membersId, popupData.courseId)
    const data = {
      courseId: popupData.courseId,
      memberId: membersId
    }
    dispatch(assignedCourse(data))
  }

  return (<>
    <Container className="mt-4">
      <h2 className="mb-4">Courses</h2>
      <Row>
        {authData.role !== 'admin' && courses.length===0  && <p>You are not assigned with any course</p>}
        {courses.map((course) => (
          <Col key={course._id} md={6} lg={4} xl={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title className='d-flex'>
                  <p>{course.name}</p>
                  {authData.role === 'admin' ? <div>
                    <Link to={`/add-exam/${course._id}`}>Add Exam</Link>
                    <Button variant="primary" type="button" className="w-100 mt-3" onClick={() => handleAddMember(course._id)}>Add Member</Button>
                  </div> : <div>
                    <Link to={`/exam-list/${course._id}`}>View All Exam</Link>
                  </div>}
                </Card.Title>
                <Card.Text>{course.description}</Card.Text>
              </Card.Body>
              {/* Optionally, add a ListGroup for additional course details */}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    <Modal show={popupData.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-4 border rounded shadow" style={{ width: '100%' }}>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail" className='mb-2'>
              <Form.Label>Select Member</Form.Label>
              <Form.Control
                as="select"
                name="assignedMembers"
                value={membersId}
                onChange={(e) => setMembersId(e.target.value)}
              >
                <option value="">Select</option>
                {
                  courseData.memberList.map((item, idx) => {
                    return (

                      <option value={item._id} key={item._id}>{item.name}</option>

                    )
                  })
                }
              </Form.Control>

            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={courseData.loading}>
              {courseData.loading ? <LoadingSpinner type="button" size="sm" inline /> : 'Assign Member'}
            </Button>
          </Form>

        </div>
      </Modal.Body>
    </Modal>
  </>
  );
};

export default CourseList;
