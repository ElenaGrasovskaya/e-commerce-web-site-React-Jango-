import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutSteps from "../components/CheckOutSteps";
import {savePaymentMethod} from "../actions/cartActions";

function PaymentScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };


  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler} className="my-3">
        <Form.Group className="my-3">
          <Form.Label as="legend">Выберите метод оплаты</Form.Label>
          <Col>
            <Form.Check
              className="my-3"
              type="radio"
              label="PayPal"
              id="paypal"
              name="paymentMethod"
              checked
              value = "PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              className="my-3"
              type="radio"
              label="LiqPay"
              id="LiqPay"
              name="paymentMethod"
              value = "LiqPay"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="my-3">
          Продолжить
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
