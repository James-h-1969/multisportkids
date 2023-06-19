import React from "react";
import { Container, Nav, Navbar, Image } from "react-bootstrap";
import "./Components.css";
import logo from "../assets/AFLKidsLogo.png";

function NavBar() {
  return (
    <>
      <Navbar expand="sm" bg="white" fixed="top" variant="light" className="navbar-custom">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand className="navbar-brand-custom">
                <Image
                    alt="lgo"
                    src={logo}
                    className="navbar-logo"
                />
            </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="nav-link-custom" href="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/camps">Holiday Camps</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/private">Private Coaching</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/development">Development Plans</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/merch">Merch</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/cart">Cart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

