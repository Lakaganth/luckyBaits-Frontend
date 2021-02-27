import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
// import Barcode from "../../assets/barcode.png";
// import Transfer from "../../assets/transfer.png";
// import Collapse from "../../assets/collapse.png";
import SKUButton from "./SKUButton";
// import { useHistory } from "react-router-dom";
import TransferButton from "./TransferButton";
import { useSelector } from "react-redux";
// import * as OrderActions from "../../store/actions/OrdersActions";
import SetPriorityButton from "./SetPriorityButton";

const OrderDetailPage = () => {
  // const history = useHistory();

  // const goBack = () => {
  //   history.goBack();
  // };

  const order = useSelector((state) => state.orders.order);

  console.log(order);
  return (
    <Container>
      <Navbar />
      <PageContainer>
        <OrderContainer>
          <DataSection>
            <LabelBoxComponent
              label="Description"
              width="15vw"
              height="15vh"
              content={order.description}
            />
            <LabelBoxComponent
              label="CAT"
              width="15vw"
              height="10vh"
              content={order.cat}
            />
            <LabelBoxComponent
              label="Inbound QTY"
              width="15vw"
              height="10vh"
              content={order.ioQty}
            />
            <LabelBoxComponent
              label="Total Needed"
              width="15vw"
              height="10vh"
              content={order.totalNeeded}
            />
          </DataSection>
          <ActionSection>
            <SKUButton sku={order.sku} order={order} />
            <TransferButton
              currentDept={order.currentDept}
              orderId={order._id}
              order={order}
            />
            <SetPriorityButton
              orderPrior={order.priority}
              orderID={order._id}
            />
          </ActionSection>
        </OrderContainer>
      </PageContainer>
    </Container>
  );
};

const LabelBoxComponent = ({ label, width, height, content, boxColor }) => {
  return (
    <LabeledBox>
      <p>{label}</p>
      <BlackBox width={width} height={height} boxColor={boxColor}>
        {content}
      </BlackBox>
    </LabeledBox>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fff;
`;
const PageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #fff;
`;

const OrderContainer = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 5vh 5vw;
  background-color: #f0f0f0;
  margin: 0 auto;
  box-shadow: 0px 12px 18px -7px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const DataSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

const LabeledBox = styled.div`
  /* width: 180px; */
  /* height: 64px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 1.5em;
    line-height: 99.2%;
    margin-bottom: 0.2em;
    /* or 30px */
    text-align: center;
  }
`;

const BlackBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.boxColor || "#262626"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5em;
  line-height: 99.2%;
  text-transform: capitalize;
  text-align: center;
  padding: 0 1vw;
  color: #e4e4f1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default OrderDetailPage;
