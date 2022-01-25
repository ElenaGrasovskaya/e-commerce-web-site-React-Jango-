import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { Image } from 'react-bootstrap'
import SearchBox from "../components/SearchBox"
import { logout } from "../actions/userActions";
function Header() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/?page=1")}><Image height={"70px"} width={"70px"} src={"/images/logo_small.png"} fluid /></Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox></SearchBox>
            <Nav className="ml-auto">
              <Nav.Link onClick={() => navigate("/cart")}>
                <i className="fa fa-shopping-cart mx-1"></i>Корзина
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link to="/profile">Аккаунт</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link onClick={() => navigate("/login")}>
                  <i className="fa fa-user mx-1"></i>Войти
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Админ" id="adminMenu">
                  <NavDropdown.Item>
                    <Link to="/admin/userlist">Пользоваели</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/admin/listproducts">Продукты</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <Link to="/admin/orderlist">Заказы</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Выйти
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>


        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
