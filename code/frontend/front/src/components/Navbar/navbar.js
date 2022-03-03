import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import React, { useState } from "react";
import Container from 'react-bootstrap/Container'
import {QuestionCircleOutlined} from '@ant-design/icons';

function NavBar() {
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
            <Nav.Link href="#features">My work</Nav.Link>
            </Nav>
            <Nav>
            <Nav.Link eventKey={0} href="#memes">
            Help
            </Nav.Link>
            {/* Todo: check login state to show the following */}
            {/* <Nav.Link href="/login">
            Login
            </Nav.Link> */}
            <NavDropdown className='mr-4' title="My Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        );
    }
export default NavBar;