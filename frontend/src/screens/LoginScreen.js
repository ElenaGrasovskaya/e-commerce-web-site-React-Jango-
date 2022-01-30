import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { login } from "../actions/userActions";
import { applyMiddleware } from "redux";

function LoginScreen({ }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
 

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;


  useEffect(() => {
    if (userInfo && !error) {
      navigate(redirect);
    }
  }, [userInfo, redirect, location]);

  const submitHandler = (e) => {
    e.preventDefault();
    

    dispatch(login(email, password));
    navigate(redirect);
    
  };

  return (
    <FormContainer>
      <h1>Войти</h1>
      {error && <Message variant="danger">{error}</Message>}
      
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group cntrolid="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Войти
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Вы у нас впервые?{" "}
          <Link to={redirect ? `/register/?redirect=${redirect}` : "/register/"}>
            Зарегистрироваться
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
