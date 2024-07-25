import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import MemberNavLink from './MemberNavLink';
import AdminNavLink from './AdminNavLink';
import { resetAuthSlice } from '../../features/auth/authSlice';
const MyNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logged, data } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            localStorage.clear();
            dispatch(resetAuthSlice())
            navigate('/login')
        });

    };

    return (
        <Navbar expand="lg" className="navbar-custom">
            <Container>
                <Navbar.Brand>
                    <Link to={`${logged ? (data.role === 'admin' ? '/admindashboard' : '/memberdashboard') : '/login'}`}>{logged ? <h1 style={{ textDecoration: 'none' }}>{data.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}</h1> : ''}</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='d-flex align-items-center'>
                        {
                            logged ? (data.role === 'admin' ? <>
                                <AdminNavLink />
                                <Nav.Link ><Button variant="secondary" onClick={handleLogout}>Logout</Button></Nav.Link>
                            </> : <>
                                <MemberNavLink />
                                <Nav.Link ><Button variant="secondary" onClick={handleLogout}>Logout</Button></Nav.Link>
                            </>) : <>
                                <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                                <Nav.Link ><Link to="/register">Register</Link></Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
