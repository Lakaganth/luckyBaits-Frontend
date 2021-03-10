import React from "react";
import styled from "styled-components";
import HighPriority from "../../assets/highpriority.png";
import LowPriority from "../../assets/lowpriority.png";

const PriorityButtons = ({ displayHigh, displayLow, high, low, total }) => {
  console.log(total);
  return (
    <Container>
      <DataContainer>
        <div className="title">
          <p className="total">Total work order</p>
          <p className="total-number">{total}</p>
        </div>
      </DataContainer>
      <div className="priority-buttons">
        <button onClick={displayHigh}>
          <ButtonContainer fontColor={"#FF2323"}>
            <div>
              <p>High Priority</p>
              <h3>{high}</h3>
            </div>
            <img src={HighPriority} alt="High PRiority" />
          </ButtonContainer>
        </button>
        <button onClick={displayLow}>
          <ButtonContainer fontColor={"#2723FF"}>
            <div>
              <p>Low Priority</p>
              <h3>{low}</h3>
            </div>
            <img src={LowPriority} alt="low Priority" />
          </ButtonContainer>
        </button>
      </div>
    </Container>
  );
};
const Container = styled.div`
  max-height: 50vh;
  width: 100vw;
  padding: 2vh 5vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 5vw;
  align-content: center;
  justify-items: center;

  .priority-buttons {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const DataContainer = styled.div`
  height: 100%;
  width: 35vw;
  background: #eeeded;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 21px;
  position: relative;
  font-family: Roboto Medium;
  .title {
    height: 40%;
    width: 100%;
    background: linear-gradient(
      180deg,
      #4f56e1 0%,
      #6b71ee 42.19%,
      #8a8ffd 100%
    );
    /* background-image: url("../../assets/semicircles.png"); */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 21px 21px 0px 0px;
    position: absolute;
    top: 0;
    left: 0;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 15px;
      color: #fff;
      margin: 5vh 0 0 5vw;
    }
    .total-number {
      font-size: 55px;
    }
  }
`;

const ButtonContainer = styled.div`
  width: 28vw;
  height: 20vh;
  background: #f3f3f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin: 2vh 0;
  padding: 1vh 2vw;
  display: flex;
  flex-direction: row;
  justify-content: space-even;
  align-items: center;

  p,
  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: 900;
    font-size: 29px;
    line-height: 90.2%;
    /* or 14px */

    text-align: center;
    letter-spacing: 0.13em;

    color: ${(props) => props.fontColor};
  }
  h3 {
    font-size: 35px;
    margin: 1vh 0;
  }
`;

export default PriorityButtons;
