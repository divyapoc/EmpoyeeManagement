import React from 'react';
import { Container, Navbar, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css'; 
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../Features/authSlice'
import { BsBoxArrowRight } from 'react-icons/bs'
const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Container>
          <div className="profile-wrapper">
            <div className="profile-circle">{userInfo.name? userInfo.name.charAt(0).toUpperCase():"G"}</div>
            <span className="profile-name">{userInfo.name ?userInfo.name:"Guest"}</span>
          </div>
          {/* Logout button */}
          <Button variant="light" onClick={() => dispatch(logout())} >
            <BsBoxArrowRight />
            Logout
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;