import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import TransferImage from "../../assets/transfer.png";
import * as OrderActions from "../../store/actions/OrdersActions";
import { useDispatch } from "react-redux";

const transferDept = [
  { value: "Assembly", label: "Assembly" },
  { value: "Painting", label: "Painting" },
  { value: "Home Worker", label: "Home Worker" },
  { value: "Plating", label: "Plating" },
  { value: "Stamping", label: "Stamping" },
  { value: "Nets", label: "Nets" },
  { value: "Purchasing", label: "Purchasing" },
];

const TransferButton = ({ currentDept, orderId, order }) => {
  const [currDept, setCurrDept] = useState(currentDept);
  const [change, setChange] = useState(false);
  const [viewHistory, setViewHistory] = useState(false);
  const dispatch = useDispatch();

  const handleTransfer = () => {
    if (change && currDept !== currentDept) {
      dispatch(OrderActions.transferDept(currDept, currentDept, orderId));
      setChange(false);
    } else {
      setViewHistory(!viewHistory);
    }
  };
  return (
    <Container>
      <TransButtons>
        <div>
          <p>Current Department</p>
          <div className="current">{currentDept}</div>
        </div>
        <img src={TransferImage} alt="TransferImage" />
        <div className="transfer-dropdown">
          <Dropdown
            className="transferDD"
            defaultValue={currDept}
            onChange={(v) => {
              setChange(true);

              setCurrDept(v.value);
            }}
            options={transferDept}
          />
        </div>
      </TransButtons>
      <HistoryButton onClick={handleTransfer}>
        {currDept === currentDept ? "View Transfer History" : "Transfer"}
      </HistoryButton>
      <>
        {viewHistory && order.transfers.length > 0 ? (
          <CompTitle>
            <p>Current Dept</p>
            <p>Transfered From</p>
            <p>Date</p>
          </CompTitle>
        ) : (
          ""
        )}
        {viewHistory && order.transfers.length > 0
          ? order.transfers.reverse().map((t) => {
              return (
                <TransferDetail
                  key={t._id}
                  current={t.currentDept}
                  prev={t.availDept}
                  time={t.time}
                />
              );
            })
          : ""}
      </>
    </Container>
  );
};

const TransferDetail = ({ current, prev, time }) => {
  return (
    <CompContainer>
      <p>{current}</p>
      <p>{prev}</p>
      <p>{time}</p>
    </CompContainer>
  );
};

const CompTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 12px;
    text-align: center;
    color: #000000;
  }
`;

const CompContainer = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  padding: 3vh 0;
  margin: 1em 0;
  background: #d0d6ed;
  border-radius: 10px;
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 16px;
    text-align: center;
    color: #000000;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const TransButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .current {
    max-width: max(25%, 200px);
    height: 3em;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(99.24deg, #2d3298 -19.47%, #8c8ec0 115.73%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
  .Dropdown-placeholder {
    /* margin: 0; */

    /* background: linear-gradient(99.24deg, #2d3298 -19.47%, #8c8ec0 115.73%); */
  }
  .Dropdown-control {
    max-width: max(25%, 200px);
    height: 3em;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(99.24deg, #2d3298 -19.47%, #8c8ec0 115.73%);
    background: linear-gradient(99.24deg, #2d3298 -19.47%, #8c8ec0 115.73%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
  .Dropdown-arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
`;
const HistoryButton = styled.button`
  width: 100%;
  background: linear-gradient(
    180deg,
    #5b69e8 0%,
    rgba(40, 113, 180, 0.86) 100%
  );
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.1em;
  margin: 1em 0;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 1.2rem;
  color: #f5f5f5;
`;

export default TransferButton;
