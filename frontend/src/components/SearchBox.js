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
          <Col md={8} xl={8} className="my-2">
            <Form.Control
              type="text"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              className="mr-sm-2 ml-sm-5"
            ></Form.Control>
          </Col>
          <Col md={3} xl={2} className="my-2">
            <Button type="submit" variant="outline-success" className="p-2">
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default SearchBox;
