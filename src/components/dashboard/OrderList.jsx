import React from "react";
import styled from "styled-components";

const OrderList = ({ order }) => {
  const {
    status,
    currentDept,
    // _id,
    sku,
    part,
    pick,
    quantity,
    receipt,
    // updatedAt,
    createdAt,
    // orderComplete,
    // transfers,
  } = order;
  console.log(status);
  return (
    <Container>
      <Color></Color>
      <Data>
        <p>Image</p>
      </Data>
      <Data>
        <p>SKU</p>
        <p>{sku}</p>
      </Data>
      <Data>
        <p>Part</p>
        <p>{part}</p>
      </Data>
      <Data>
        <p>Quantity</p>
        <p>{quantity}</p>
      </Data>
      <Data>
        <p>Quanity Done</p>
        <p>{quantity}</p>
      </Data>
      <Data>
        <p>Department</p>
        <p>{currentDept}</p>
      </Data>
      <Data>
        <p>Receipt</p>
        <p>{receipt}</p>
      </Data>
      <Data>
        <p>Pick</p>
        <p>{pick}</p>
      </Data>
      <Data>
        <p>Time</p>
        <p>{createdAt}</p>
      </Data>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-radius: 19px;
  background: #f4f4f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 25px 10px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  /* justify-content:center; */
  /* align-content:center; */
`;

const Data = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 2);
  /* align-self:center; */
  justify-self: center;
  border-right: 1px solid rgba(204, 204, 204, 0.67);
  padding-right: 10px;
  p {
    text-align: center;
    padding: 10px 0;
  }
`;

const Color = styled.div`
  background-color: rgba(39, 35, 255, 0.55);
  position: absolute;
  height: 50px;
  width: 100%;
  border-top-left-radius: 19px;
  border-top-right-radius: 19px;
`;

export default OrderList;
