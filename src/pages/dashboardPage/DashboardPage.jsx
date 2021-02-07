import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import OrderList from "../../components/dashboard/OrderList";
import Navbar from "../../components/navbar/Navbar";
import { Link, useHistory } from "react-router-dom";

const DashboardPage = () => {
  const ordersRedux = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const getAllOrders = async () => {
      dispatch(OrderActions.getAllOrders());
    };
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Navbar />
      <h3>Dashboard</h3>
      <RecentWorkOrder>
        {ordersRedux.length > 0 &&
          ordersRedux.map((order, index) => (
            // <Link
            //   to={{ pathname: `/orders/${order._id}`, order: { order } }}
            //   key={order._id}
            // >
            <button
              key={order._id}
              onClick={() =>
                history.push({
                  pathname: `/orders/${order._id}`,
                  order: { order },
                })
              }
            >
              <OrderList key={order._id} order={order} />
            </button>
            // </Link>
          ))}
      </RecentWorkOrder>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  /* height: 100vh; */
  background-color: #e4eaf5;
  button {
    background-color: transparent;
  }

  a {
    color: black;
  }
`;

const RecentWorkOrder = styled.div`
  width: 90%;
  background-color: #e4eaf5;
  margin: 0 auto;
`;

export default DashboardPage;
