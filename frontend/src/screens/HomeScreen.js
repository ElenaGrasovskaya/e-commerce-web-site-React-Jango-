import React, { useEffect } from "react";
import { Row, Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";

function HomeScreen() {
  const dispatch = useDispatch();
  const productlist = useSelector((state) => state.productlist);

  const { loading, error, products } = productlist;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>Latest Products</h1>

        {loading&&(!error)? <Loader ></Loader>
          :(error ? <Message variant="danger" children = {error}></Message>
        : <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>)
      }

        
      </div>
    </div>
  );
}

export default HomeScreen;
