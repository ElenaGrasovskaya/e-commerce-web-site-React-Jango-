import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";
import { useParams } from "react-router";
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import { register } from "../actions/userActions";

function ProductListScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let keyword = location.search; 

  const { id } = useParams();

  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products, page, pages } = productlist;

  const productDelete = useSelector((state) => state.productDelete);
  const { error:errorDelete, loading:loadingDelete, success: successDelete } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const { error: errorCreate, loading: loadingCreate, success: successCreate, product: createdProduct } = productCreate;


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET})
 

    if (!userInfo.isAdmin) {
      navigate("/login");
    }

    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword))
    }

        
  }, [dispatch, navigate, userInfo, successDelete, successCreate, createdProduct, keyword]);

  const deleteHandler = (id) => {
    if (window.confirm("Уверены, что это продукт нужно удалить?")) {
      dispatch(deleteProduct(id))
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Продукты</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fa fa-plus"></i>  Создать продукт
          </Button> 
        </Col>
      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete &&<Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader/>}
      {errorCreate &&<Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>ИМЯ</th>
              <th>ЦЕНА</th> 
              <th>КАТЕГОРИЯ</th>
              <th>ПРОИЗВОДИТЕЛЬ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fa fa-edit" style={{ color: "green" }}></i>
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </td>
              </tr>
              
            ))}

            <tr><Paginate page={page} pages={pages} isAdmin = {false}/></tr>
          </tbody>
        </Table>
        
      )}
      
    </div>
  );
}

export default ProductListScreen;
