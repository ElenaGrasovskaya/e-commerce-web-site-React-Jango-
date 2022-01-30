import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router";
import { USER_UPDATE_RESET } from "../constants/userConstants";

import { getUserDetails, register, updateUser } from "../actions/userActions";
import { applyMiddleware } from "redux";

function UserEditScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate;



  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== Number(id)) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, id, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id:user._id, name, email, isAdmin}));
  };

  return (
    <div>
      <Link to="/admin/userlist">Назад</Link>
      <FormContainer>
        <h1>Настройка профиля</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="checkbox">
              <Form.Label>Статус</Form.Label>
              <Form.Check
                type="checkbox"
                label="Админ?"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Сохранить
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
