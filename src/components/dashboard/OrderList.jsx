import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "react-dropdown";
import { useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import { useHistory } from "react-router-dom";
import Switch from "react-switch";
// import { useSelector } from "react-redux";

const transferDept = [
  { value: "Assembly", label: "Assembly" },
  { value: "Painting", label: "Painting" },
  { value: "Home Worker", label: "Home Worker" },
  { value: "Plating", label: "Plating" },
  { value: "Stamping", label: "Stamping" },
  { value: "Nets", label: "Nets" },
  { value: "Purchasing", label: "Purchasing" },
];

const OrderList = ({ order }) => {
  const history = useHistory();
  const {
    _id,
    currentDept,
    sku,
    description,
    weeks2,
    weeks4,
    ioQty,
    cat,
    priority,
    totalNeeded,
  } = order;
  const [currPriority, setPriority] = useState(() =>
    priority === "high" ? true : false
  );
  const dispatch = useDispatch();

  const setCurrDept = (newDept) => {
    dispatch(OrderActions.transferDept(newDept, currentDept, _id));
  };

  const setPrior = () => {
    setPriority(!currPriority);
    dispatch(OrderActions.setOrderPriority(!currPriority, _id));
  };

  return (
    <ListContainer>
      <Data>
        <Switch onChange={setPrior} checked={currPriority} />
      </Data>

      <Data>
        <button
          onClick={() =>
            history.push({
              pathname: `/bom/${sku}`,
            })
          }
        >
          {sku}
        </button>
      </Data>
      <Data>
        <p>{description}</p>
      </Data>
      <Data>
        <p>{weeks2}</p>
      </Data>
      <Data>
        <p>{weeks4}</p>
      </Data>
      <Data>
        {/* <p>{currentDept}</p> */}
        <Dropdown
          className="transferDD"
          defaultValue={currentDept}
          placeholder={currentDept}
          onChange={(v) => {
            // setChange(true);
            setCurrDept(v.value);
          }}
          options={transferDept}
        />
      </Data>
      <Data>
        <p>{ioQty}</p>
      </Data>
      <Data>
        <p>{cat}</p>
      </Data>
      <Data>
        <p>{totalNeeded}</p>
      </Data>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 100%;
  min-height: 12vh;
  background-color: #fff;
  border-radius: 19px;
  background: #f4f4f4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 25px 10px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(9, 10vw);
  /* justify-content: center;
  align-content: center; */
`;

const Data = styled.div`
  display: grid;
  /* grid-template-columns: repeat(1fr, 2); */
  align-self: center;
  justify-self: center;
  /* border-right: 1px solid rgba(204, 204, 204, 0.67); */
  /* padding-right: 10px; */
  p {
    text-align: center;
    padding: 10px 0;
  }
  button {
    text-align: center;
    font-size: 1.1rem;
    /* padding: 10px 0;*/
  }
`;
// const ButtonData = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1fr, 2);
//   /* align-self: center; */
//   /* justify-self: center; */
//   border-right: 1px solid rgba(204, 204, 204, 0.67);
//   padding-right: 10px;
//   button {
//     margin: 0;
//     padding: 0;
//   }
//   p {
//     /* text-align: center; */
//     padding: 10px 0;
//   }
// `;

export default OrderList;
