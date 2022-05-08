import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container'
import { useCookies } from 'react-cookie';
import "../../style/NavBar.css"
import "../../bootstrap-4.3.1-dist/css/bootstrap.min.css"

function NavBar() {
  const [cookie, removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie('name');
    removeCookie('email');
    removeCookie('refresh_token');
    removeCookie('access_token');
    removeCookie('avatar');
    removeCookie('user_id')
  };
  let listener = null
  const [scrollState, setScrollState] = useState("top")

  useEffect(() => {
    listener = document.addEventListener("scroll", e => {
      var scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 200) {
        if (scrollState !== "amir") setScrollState("amir")
      } else {
        if (scrollState !== "top") setScrollState("top")
      }
    })
    return () => {
      document.removeEventListener("scroll", listener)
    }
  }, [scrollState])
  return (
    <>
      {window.location.pathname === "/" ?
        <>
          {scrollState === "top" ?
            <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-scroll" variant='dark' style={{ fontFamily: 'Helvetica' }}>
              <Container fluid>
                <img
                  alt=""
                  src="../images/clipart3190.png"
                  width="60"
                  height="50"
                  className="d-inline-block align-top"
                />{' '}
                <Navbar.Brand href="/">
                  IFUN
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/gallery">Community</Nav.Link>
                  </Nav>
                  <Nav>
                    {/* <Nav.Link eventKey={0} href="#memes" onClick={handelHelp}>
          Help
          </Nav.Link> */}
                    {cookie.name !== 'undefined' && cookie.name ?
                      (
                        <NavDropdown className='mr-4' title="My Account" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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
            :
            <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-scrolled-dark" variant='dark' style={{ fontFamily: 'Helvetica' }}>
              <Container fluid>

                <img
                  alt=""
                  src="../images/clipart3190.png"
                  width="60"
                  height="50"
                  className="d-inline-block align-top"
                />{' '}
                <Navbar.Brand href="/">
                  IFUN
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/gallery">Community</Nav.Link>
                  </Nav>
                  <Nav>
                    {cookie.name !== 'undefined' && cookie.name ?
                      (
                        <NavDropdown className='mr-4' title="My Account" id="collasible-nav-dropdown">
                          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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
          }
        </>
        :
        <>
          <Navbar collapseOnSelect expand="lg" className="fixed-top navbar-scrolled-dark" variant='dark' style={{ fontFamily: 'Helvetica' }}>
            <Container fluid>
              <img
                alt=""
                src="../images/clipart3190.png"
                width="60"
                height="50"
                className="d-inline-block align-top"
              />{' '}
              <Navbar.Brand href="/">
                IFUN
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/gallery">Community</Nav.Link>
                </Nav>
                <Nav>
                  {cookie.name !== 'undefined' && cookie.name ?
                    (
                      <NavDropdown className='mr-4' title="My Account" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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
        </>
      }

    </>
  );
}
export default NavBar;