import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
const initFormData = {
  name: '',
  email: '',
  password: '',
  phone: '',
  gender: '',
}
const RegistrationForm = () => {
  const [formData, setFormData] = useState(initFormData);

  const { name, email, password, phone, gender } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerSliceData= useSelector((state)=>{
    return state.auth;
  })

  useEffect(()=>{
    if(registerSliceData.error){
      // show error in alert message 
    }else{
      if(registerSliceData.data?.isSuccess){
        // show success alert message
        navigate('/admindashboard');
        setFormData(initFormData);
      }
    }
  },[registerSliceData])

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="p-4 border rounded shadow" style={{width:'50%'}}>
        <h2 className="mb-2 text-center">Register</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formName" className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone" className='mb-2'>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              value={phone}
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group controlId="formGender" className='mb-2'>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={gender}
              onChange={onChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3" disabled={registerSliceData.loading}>
            {registerSliceData.loading?<LoadingSpinner type="button" size="sm" inline/>:'Register'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegistrationForm;
