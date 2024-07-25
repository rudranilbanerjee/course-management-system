import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MemberNavLink=()=>{
    return (
        <>
            <Nav.Link><Link to="/view-result">View Result</Link></Nav.Link>

        </>
    )
}

export default MemberNavLink;