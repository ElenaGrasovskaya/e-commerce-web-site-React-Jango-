import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router";
import axios from "axios";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import {
  getUserDetails,
  register,
  updateUser,
} from "../actions/productActions";
import { applyMiddleware } from "redux";

function ProductEditScreen() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/listproducts");
    }
    if (!product.name || product._id !== Number(productId)) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product, productId, dispatch, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/products/upload/", formData, config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/listproducts">Назад</Link>
      <FormContainer>
        <h1>Редактировать продукт</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Название продукта</Form.Label>
              <Form.Control
                type="text"
                placeholder="Название продукта"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Цена продукта</Form.Label>
              <Form.Control
                type="number"
                placeholder="Цена продукта"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Изображение</Form.Label>
              <Form.Control
                type="text"
                placeholder="Изображение"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.Control
                type="file"
                className="my-1"
                controlId ="image-file"
                label="Choose file"

                onChange={uploadFileHandler}
              />

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Производитель</Form.Label>
              <Form.Control
                type="text"
                placeholder="Производитель"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Количество доступное на складе</Form.Label>
              <Form.Control
                type="number"
                placeholder="Количество доступное на складе"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Категория</Form.Label>
              <Form.Control
                type="text"
                placeholder="Категория"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="text"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-3">
              Обновить
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
