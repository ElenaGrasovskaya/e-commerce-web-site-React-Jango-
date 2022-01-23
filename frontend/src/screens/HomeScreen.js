import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  let keyword = location.search;
  console.log("keyword from home screen", keyword);

  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products, page, pages } = productlist;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>

        {(keyword.search("keyword")===-1) && <ProductCarousel></ProductCarousel>}


        <h1>Latest Products</h1>
        
        {loading ? <Loader />
            : error ? <Message variant='danger'>{error}</Message>
                :
                <div>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    
                </div>
        }
        <Paginate page={page} pages={pages} isAdmin = {false} />
    </div>
)
}


export default HomeScreen;
