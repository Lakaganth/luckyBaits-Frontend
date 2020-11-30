import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";

const OrderDetailPage = ({ order }) => {
  console.log(order);
  return (
    <Container>
      <Navbar />
      <OrderContainer>
        <p>Hello</p>
      </OrderContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;
const OrderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;

export default OrderDetailPage;
