import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AdminDashboardPage from './pages/Dashboard/AdminDashboardPage';
import PrivateRoute from './components/Shared/PrivateRoute';
import CreateMember from './components/CreateMember/CreateMember';
import MyNavbar from './components/Navbar/NavBar';
import MemberDashboardPage from './pages/Dashboard/MemberDashboardPage';
import CreateCourse from './pages/Course/CreateCourse';
import CourseListPage from './pages/Course/CourseListPage';
import CreateExamForm from './pages/Exam/CreateExamForm';
import ExamListPage from './pages/Exam/ExamListPage';
import ExamPage from './components/Exam/ExamPage';
import ExamResultList from './components/Exam/ExamResultList';

function App() {

  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Navigate to='/login'/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admindashboard" element={<PrivateRoute type={['admin']}><AdminDashboardPage /></PrivateRoute>} />
        <Route path="/memberdashboard" element={<PrivateRoute type={['member']}><MemberDashboardPage /></PrivateRoute>} />
        <Route path="/create-member" element={<PrivateRoute type={['admin']}><CreateMember /></PrivateRoute>} />
        <Route path="/create-course" element={<PrivateRoute type={['admin']}><CreateCourse /></PrivateRoute>} />
        <Route path="/course-list" element={<PrivateRoute type={['admin','member']}><CourseListPage /></PrivateRoute>} />
        <Route path="/add-exam/:courseId" element={<PrivateRoute type={['admin']}><CreateExamForm /></PrivateRoute>} />
        <Route path="/exam-list/:courseId" element={<PrivateRoute type={['member']}><ExamListPage /></PrivateRoute>} />
        <Route path="/exam-page" element={<PrivateRoute type={['member']}><ExamPage /></PrivateRoute>} />
        <Route path="/view-result" element={<PrivateRoute type={['admin','member']}><ExamResultList /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
