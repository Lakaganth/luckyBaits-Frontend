import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import OrderList from "../../components/dashboard/OrderList";
import Navbar from "../../components/navbar/Navbar";

const DashboardPage = () => {
  const ordersRedux = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const getAllOrders = async () => {
    dispatch(OrderActions.getAllOrders());
    // console.log(ordersRedux[0].status);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleOrderDetailNavigation = (order) => {
    console.log("Hallo");
  };

  return (
    <Container>
      <Navbar />
      <h3>Dashboard</h3>
      <RecentWorkOrder>
        {ordersRedux.length > 0 &&
          ordersRedux.map((order, index) => (
            <button
              key={order._id}
              onClick={() => handleOrderDetailNavigation(order)}
            >
              <OrderList key={order._id} order={order} />
            </button>
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
`;

const RecentWorkOrder = styled.div`
  width: 90%;
  background-color: #e4eaf5;
  margin: 0 auto;
`;

export default DashboardPage;
