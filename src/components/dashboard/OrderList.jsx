import React from "react";
import styled from "styled-components";

const OrderList = ({ order }) => {

  const {
    // status,
    currentDept,
    // _id,
    sku,
    description,
    weeks2,
    weeks4,
    ioQty,
    cat,
    // updatedAt,
    totalNeeded,
    // orderComplete,
    // transfers,
  } = order;

  return (
    <Container>
      <Color></Color>
      <Data>
        <p>Image</p>
        <p></p>
      </Data>

      <Data>

        <p>SKU</p>
        <p>{sku}</p>

      </Data>
      <Data>
        <p>Description</p>
        <p>{description}</p>
      </Data>
      <Data>
        <p>2 Weeks</p>
        <p>{weeks2}</p>
      </Data>
      <Data>
        <p>4 Weeks</p>
        <p>{weeks4}</p>
      </Data>
      <Data>
        <p>Department</p>
        <p>{currentDept}</p>
      </Data>
      <Data>
        <p>Inbound Order QTY</p>
        <p>{ioQty}</p>
      </Data>
      <Data>
        <p>CAT</p>
        <p>{cat}</p>
      </Data>
      <Data>
        <p>Total Needed</p>
        <p>{totalNeeded}</p>
      </Data>
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  min-height: 10vh;
  background-color: #fff;
  border-radius: 19px;
  background: #f4f4f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 25px 10px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  /* justify-content: center;
  align-content: center; */
`;

const Data = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 2);
  align-self: center;
  justify-self: center;
  border-right: 1px solid rgba(204, 204, 204, 0.67);
  /* padding-right: 10px; */
  p {
    text-align: center;
    padding: 10px 0;
  }
`;
const ButtonData = styled.div`
  display: grid;
  grid-template-columns: repeat(1fr, 2);
  /* align-self: center; */
  /* justify-self: center; */
  border-right: 1px solid rgba(204, 204, 204, 0.67);
  padding-right: 10px;
  button {
    margin: 0;
    padding: 0;
  }
  p {
    /* text-align: center; */
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
