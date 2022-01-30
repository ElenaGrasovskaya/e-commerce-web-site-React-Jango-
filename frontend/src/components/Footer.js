import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Container>
          <Row>
              <Col className = "text-center py-3"> Наш футтер с запоминающейся фразой
              </Col>
          </Row>
          </Container>
    </footer>
  );
}

export default Footer;
