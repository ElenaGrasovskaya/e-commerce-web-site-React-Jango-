import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown  } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { logout } from "../actions/userActions"
function Header() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const dispatch = useDispatch();


  const logoutHandler = () => {
    dispatch(logout());
  }
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

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => navigate("/login")}>
                  <i className="fa fa-user mx-1"></i>Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>

          <Nav.Link onClick={() => navigate("configuration")}></Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
