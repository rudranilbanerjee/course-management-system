import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavLink=()=>{
    return (
        <>
            <Nav.Link><Link to="/create-member">Create Member</Link></Nav.Link>
            <Nav.Link><Link to="/create-course">Create Course</Link></Nav.Link>
            <Nav.Link><Link to="/course-list">Courses</Link></Nav.Link>
            <Nav.Link><Link to="/view-result">View Result</Link></Nav.Link>
        </>
    )
}

export default AdminNavLink;