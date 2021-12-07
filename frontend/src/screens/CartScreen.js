import React, { isValidElement } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart } from "../actions/cartActions";
import { removeFromCart } from "../actions/cartActions";

import { useParams } from "react-router";
import { useEffect } from "react";

function CartScreen({ history }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id;
  let location = useLocation();
  const qty = location ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log("cartItems", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty)); 
    }
  }, [dispatch, productId, qty]); 

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    console.log("remove", id);
  };

  const checkoutHandler = () => {
    if(!userInfo)
    navigate('/login/');
    else
    navigate('/shipping/');
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty<Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => +acc + Number(item.qty), 0)})</h2>
              ${cartItems.reduce((acc, item) =>Number( +acc + Number(item.qty)*Number(item.price)).toFixed(2), 0)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <Button
            type='button'
            className='btn-block'
            disabled = {cartItems.length === 0}
            onClick = {checkoutHandler}
            >
              Proceed To Checkout

            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
