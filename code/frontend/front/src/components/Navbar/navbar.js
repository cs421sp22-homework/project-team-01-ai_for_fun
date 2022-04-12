import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import React, { useContext, useRef } from "react";
import Container from 'react-bootstrap/Container'
import {QuestionCircleOutlined} from '@ant-design/icons';
import {LoginContext} from '../../context/AuthProvider';
import { useCookies } from 'react-cookie';

function NavBar() {
  const [cookie, setCookie,removeCookie] = useCookies();
  
  const handelHelp = () => {
  }
  const handleLogout = () => {
    removeCookie('name');
    removeCookie('email');
    removeCookie('refresh_token');
    removeCookie('access_token');
    removeCookie('avater');
    removeCookie('user_id')
  };
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container fluid>
        <Navbar.Brand href="/">
        <img
          alt=""
          src="https://i.pinimg.com/736x/86/88/b6/8688b6457ff71260977f50fd09a7f05a.jpg"
          width="50"
          height="40"
          className="d-inline-block align-top"
        />{' '}
        IFUN
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/gallery">Community</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link eventKey={0} href="#memes" onClick={handelHelp}>
            Help
            </Nav.Link>
            {cookie.name ? 
            (
              <NavDropdown className='mr-4' title="My Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">My work</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>log out</NavDropdown.Item>
            </NavDropdown>
            ) 
            : (<Nav.Link href="/login">
            Login
            </Nav.Link>)}
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
export default NavBar;