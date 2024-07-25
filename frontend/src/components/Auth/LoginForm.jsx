import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner';
const initFormData = {
  email: '',
  password: '',
}
const LoginForm = () => {
  const [formData, setFormData] = useState(initFormData);

  const { email, password } = formData;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginSliceData = useSelector((state) => {
    return state.auth;
  })

  useEffect(() => {
    if (loginSliceData.error) {
      // show error in alert message 
    } else {
      if (loginSliceData.data?.isSuccess) {
        // show success alert message
        if (loginSliceData.data.role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/memberdashboard');
        }
        setFormData(initFormData);
      }
    }
  }, [loginSliceData])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-4 border rounded shadow" style={{ width: '40%' }}>
        <h2 className="mb-2 text-center">Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBasicEmail" className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loginSliceData.loading}>
          {loginSliceData.loading?<LoadingSpinner type="button" size="sm" inline/>:'Login'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginForm;
