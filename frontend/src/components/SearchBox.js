import React, { useState } from "react";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  let navigate = useNavigate();
 
  const location = useLocation();


  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){

        navigate(`/?keyword=${keyword}&page=1`)
    }
    else
    {
      console.log("location.pathname", location.pathname)
      navigate(location.pathname); 
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Container fluid="true">
        <Row>
          <Col>
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              
             
            ></Form.Control>
          </Col>
          <Col>
            <Button type="submit" variant="success" fluid="true">
            <i className="fa fa-search"></i> Поиск
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default SearchBox;
