import React from "react";
import styled from "styled-components";
import Navbar from "../../components/navbar/Navbar";
import Barcode from "../../assets/barcode.png";
import Transfer from "../../assets/transfer.png";
import Collapse from "../../assets/collapse.png";

const OrderDetailPage = (props) => {
  const { order } = props.location.order;

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <Container>
      <Navbar />
      <PageContainer>
        <OrderContainer>
          <div className="left-col">
            <LabelBoxComponent
              label="SKU"
              width="180px"
              height="100px"
              content={order.sku}
            />
            <LabelBoxComponent
              label="Part"
              width="180px"
              height="247px"
              content={order.part}
            />
            <LabelBoxComponent
              label="Quantity"
              width="180px"
              height="100px"
              content={order.quantity}
            />
            <LabelBoxComponent
              label="Department"
              width="180px"
              height="100px"
              content={order.currentDept}
            />
          </div>
          <div className="status">
            <LabelBoxComponent
              label="Status"
              width="180px"
              height="100px"
              content={order.status}
              boxColor="#2ED284"
            />
          </div>
          <div className="receipt">
            <LabelBoxComponent
              label="Receipt"
              width="180px"
              height="100px"
              content={order.receipt}
            />
          </div>
          <div className="barcode">
            <LabelBoxComponent
              label=""
              width="575px"
              height="367px"
              content={<img src={Barcode} alt="barcode-img" />}
              boxColor="#D2D8EE"
            />
          </div>
          <div className="transfer">
            <LabelBoxComponent
              width="280px"
              height="100px"
              content={
                <div className="transfer-content">
                  <img src={Transfer} alt="transfer-img" />
                  <p>Transfer</p>
                </div>
              }
              boxColor="#4F56E1"
            />
          </div>
          <div className="receipt">
            <LabelBoxComponent
              label="Receipt"
              width="180px"
              height="100px"
              content={order.receipt}
            />
          </div>
          <CollapseBox>
            <button onClick={goBack}>
              <img src={Collapse} alt="Close" />
            </button>
          </CollapseBox>
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
  height: 100vh;
  background-color: #fff;
`;
const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
`;
const CollapseBox = styled.div`
  grid-area: collapse;
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
  grid-template-columns: 1fr 5vw 1fr 1fr 20px;
  /* grid-template-rows: auto; */

  grid-template-areas:
    "leftcol . status receipt collapse "
    "leftcol . barcode barcode ."
    "leftcol . barcode barcode ."
    "leftcol . . transfer .";

  align-content: center;

  .left-col {
    grid-area: leftcol;
    div {
      padding: 2vh 0;
    }
  }
  .status {
    grid-area: status;
  }
  .barcode {
    grid-area: barcode;
  }
  .receipt {
    grid-area: receipt;
  }
  .transfer {
    grid-area: transfer;
    padding: 1vh auto;
    align-self: center;
  }
  .transfer-content {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin: 1vh auto;
  }
`;

const LabeledBox = styled.div`
  width: 180px;
  /* height: 64px; */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 99.2%;
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
  font-size: 39px;
  line-height: 99.2%;
  text-transform: capitalize;

  text-align: center;
  padding: 1vh 0;
  color: #e4e4f1;
`;

export default OrderDetailPage;
