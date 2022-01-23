import React from "react";
import { Container, Nav } from "react-bootstrap";

import { withRouter } from "react-router-dom";

import { useNavigate } from "react-router";

function CheckOutSteps({ step1, step2, step3, step4 }) {
  const navigate = useNavigate();

  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
        ) : (
          <Nav.Link disabled>Залогиниться</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Nav.Link onClick={() => navigate("/shipping")}>Доставка</Nav.Link>
        ) : (
          <Nav.Link disabled>Доставка</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Nav.Link onClick={() => navigate("/payment/")}>Оплата</Nav.Link>
        ) : (
          <Nav.Link disabled>Оплата</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link onClick={() => navigate("/placeorder")}>
            Заказать
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Заказать</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckOutSteps;
