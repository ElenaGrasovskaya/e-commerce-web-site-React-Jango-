import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";
import { applyMiddleware } from "redux";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const [newLogin, setNewLogin] = useState({});
  let success = false;

  useEffect(() => {
    if (userInfo && !error) {
      navigate(redirect);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password != confirmPassword) {
        setMessage('Passwords do not match');
    }else{
        dispatch(register(name, email, password));
    }

  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Регистрация успешна</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group cntrolid="name">
          <Form.Label>Ваше имя</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Ваше имя"
            value={email}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolId="passwordConfirm">
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            required
            type="confirmPassword"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-3">
          Зарегистрироваться
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Уже есть аккаунт?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Войти
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
