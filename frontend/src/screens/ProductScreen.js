import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { useParams } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";

function ProductScreen() {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [id, dispatch, successProductReview]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Назад
      </Link>
      {loading && !error ? (
        <Loader />
      ) : error ? (
        <Message variant="danger" children={error}></Message>
      ) : (
        <div>
          <Row>
            <Col md={6} sm={12}>
              <Image src={product.image} alt={product.name} fluid="true" />
            </Col>
            <Col md={3} sm={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  ></Rating>
                </ListGroup.Item>

                <ListGroup.Item>Цена: ${product.price}</ListGroup.Item>

                <ListGroup.Item>
                  Описание: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3} sm={6}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Цена:</Col>
                      <Col>
                        <strong>${product.price} </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Статус:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Кол-во</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      disabled={product.countInStock == 0}
                      type="button"
                    >
                      В корзину
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Отзывы</h3>
              {product.reviews.length === 0 && (
                <Message variant="info">Нет отзывов</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color="#f8e825" />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h3>Написать отзыв</h3>
                  {loadingProductReview && <Loader />}
                  {successProductReview && (
                    <Message variant="success">Отзыв сохранен</Message>
                  )}
                  {errorProductReview && (
                    <Message variant="danger">Отзыв не сохранен</Message>
                  )}

                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Рейтинг</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Выбрать...</option>
                          <option value="1">1 - Совсем нет</option>
                          <option value="2">2 - Такое</option>
                          <option value="3">3 - Средне</option>
                          <option value="4">4 - Хорошо</option>
                          <option value="5">5 - Прекрасно</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="comment">
                        <Form.Label>Отзыв</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="5"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingProductReview}
                        type="submit"
                        variant="primary"
                        onSubmit={submitHandler}
                        className="my-3"
                      >
                        Сохранить
                      </Button>
                    </Form>
                  ) : (
                    <Message variant="info">
                      Пожалуйста <Link to="/login">войдите</Link> в свой аккаунт чтобы оставить отзыв
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
