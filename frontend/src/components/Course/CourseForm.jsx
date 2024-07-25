import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourses } from '../../features/course/courseSlice';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../Shared/LoadingSpinner';
const initFormData = {
    name: '',
    description: '',
}
const CourseForm = () => {
    const [formData, setFormData] = useState(initFormData);

    const { name, description } = formData;
    const dispatch = useDispatch();

    const createCourseData = useSelector((state) => {
        return state.course;
    })

    useEffect(() => {
        if (createCourseData.error) {
            // show error in alert message 
        } else {
            setFormData(initFormData);
        }
    }, [createCourseData])

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createCourses(formData));
    };

    return (
        <Container className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="p-4 border rounded shadow" style={{width:'50%'}}>
                <h2 className="mb-4 text-center">Create Course</h2>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formName" className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course name"
                            name="name"
                            value={name}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription" className='mb-3'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter course description"
                            name="description"
                            value={description}
                            onChange={onChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" disabled={createCourseData.loading}>
                        {createCourseData.loading ? <LoadingSpinner type="button" size="sm" inline /> : 'Create Course'}

                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default CourseForm;
