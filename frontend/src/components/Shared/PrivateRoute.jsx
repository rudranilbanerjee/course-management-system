import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ type,children }) => {
  const { logged, data } = useSelector((state) => state.auth);
  console.log(type.includes('admin'))
  return logged ?(type.includes(data.role)? children:(type.includes('admin')?<Navigate to="/admindashboard" />:<Navigate to="/memberdashboard" />) ): <Navigate to="/login" />;
};

export default PrivateRoute;
