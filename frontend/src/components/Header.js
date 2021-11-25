import React from "react";
import { useNavigate } from "react-router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

import { withRouter } from "react-router";
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>ProShop</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => navigate("/cart")}>
                <i className="fa fa-shopping-cart mx-1"></i>Cart
              </Nav.Link>

              <Nav.Link onClick={() => navigate("/login")}>
                <i className="fa fa-user mx-1"></i>Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav.Link onClick={() => navigate("configuration")}></Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
