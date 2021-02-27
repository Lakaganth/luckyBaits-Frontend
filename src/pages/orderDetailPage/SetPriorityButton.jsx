import React, { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";

const SetPriorityButton = ({ orderPrior, orderID }) => {
  const [priority, setPriority] = useState(() =>
    orderPrior === "high" ? true : false
  );

  const dispatch = useDispatch();

  const setPrior = () => {
    setPriority(!priority);
    dispatch(OrderActions.setOrderPriority(!priority, orderID));
  };
  return (
    <Container>
      <p>Current Priority</p>
      <Switch onChange={setPrior} checked={priority} />
      <p>{orderPrior}</p>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 99.2%;
  }
`;

export default SetPriorityButton;
