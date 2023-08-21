import { Container, Nav, Navbar, Image, Button, NavDropdown } from "react-bootstrap";
import "./Components.css";
import logo from "/assets/AFLKidsLogo.png";
import { useCart } from "../context/cartContext";
import useMediaQueries from "media-queries-in-react";

function NavBar() {
  const {openCart, cartQuantity} = useCart();
  const mediaQueries = useMediaQueries({ 
    mobile: "(max-width: 768px)", // Adjust max-width for mobile screens
  });
  return (
    <>
      {!mediaQueries.mobile?
      <Navbar bg="white" fixed="top" variant="light" className="navbar-custom shadom-sm">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand className="navbar-brand-custom">
            <Image alt="logo" src={logo} className="navbar-logo" style={{width:"200px"}}/>
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link className="nav-link-custom" href="/">Home</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/camps">Holiday Camps</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/private">Private Coaching</Nav.Link>
              {/* <Nav.Link className="nav-link-custom" href="/development">Academy Preparation</Nav.Link> */}
              <Nav.Link className="nav-link-custom" href="/merch">Merch</Nav.Link>
              <Nav.Link className="nav-link-custom" href="/contact">Our Team</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          { (cartQuantity > 0) ? 
            <Button style={{
              width: "3rem", height: "3rem", position: "relative"}} 
              variant="outline-primary" className="rounded-circle"
              onClick={openCart}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
              width: "1.5rem", 
              height:"1.5rem", 
              color:"white", 
              position:"absolute", 
              bottom:"0", 
              right:"0",
              transform:"translate(25%, 25%)"}}>
              {cartQuantity}
            </div>
            </Button>:<></>
          }
        </Container>
      </Navbar>:
      <Navbar bg="white" fixed="top" variant="light" className="navbar-custom shadom-sm">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand className="navbar-brand-custom">
          <Image alt="logo" src={logo} className="navbar-logo" style={{width:"200px"}}/>
        </Navbar.Brand>
        <Nav>
          <NavDropdown title="Book now" id="basic-nav-dropdown" style={{marginRight:"60px"}}>
                  <NavDropdown.Item href="/">Home</NavDropdown.Item>
                  <NavDropdown.Item href="/camps">Holiday Camps</NavDropdown.Item>
                  <NavDropdown.Item href="/private">Private Coaching</NavDropdown.Item>
                  <NavDropdown.Item href="/merch">Merch</NavDropdown.Item>
                  <NavDropdown.Item href="/contact">Our Team</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        { (cartQuantity > 0) ? 
            <Button style={{
              width: "100%", height: "55px", position: "relative", right:"50px"}} 
              variant="outline-primary" className="rounded-circle"
              onClick={openCart}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
            </svg>
            <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center" style={{
              width: "1.5rem", 
              height:"1.5rem", 
              color:"white", 
              position:"absolute", 
              bottom:"0", 
              right:"0",
              transform:"translate(25%, 25%)"}}>
              {cartQuantity}
            </div>
            </Button>:<></>
          }
      </Container>
    </Navbar>
      }
    </>
        
  );
}

export default NavBar;


