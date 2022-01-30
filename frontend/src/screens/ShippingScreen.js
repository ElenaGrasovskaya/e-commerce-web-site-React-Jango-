import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import {saveShippingAddress} from '../actions/cartActions';


function ShippingScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();

  const dispatch = useDispatch(); 
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment/');

  }; 
  return (
    <FormContainer>
        <CheckOutSteps step1 step2/>
      <h1>Доставка</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group cntrolid="address">
          <Form.Label>Адрес</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Адрес"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="city">
          <Form.Label>Город</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Город"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="postalCode">
          <Form.Label>Индекс</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Индекс"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group cntrolid="country">
          <Form.Label>Страна</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Страна"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          className="my-3"
          type="submit"
          variant="primary"
          onSubmit={submitHandler}
        >
          Продолжить
        </Button>
      </Form>
      
    </FormContainer>
  );
}

export default ShippingScreen;
