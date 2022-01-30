import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listOrders } from "../actions/orderActions";


function OrderListScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);
 


  return (
    <div>
      <h1>Заказы</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>ПОЛЬЗОВАТЕЛЬ</th>
              <th>ДАТА</th>
              <th>СУММА</th>
              <th>ОПЛАЧЕНО</th>
              <th>ДОСТАВЛЕНО</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                   order.paidAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                   order.deliveredAt
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/orders/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Подробнее
                    </Button>
                  </Link>


                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
