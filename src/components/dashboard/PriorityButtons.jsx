import React from "react";
import styled from "styled-components";
import { HorizontalBar } from "react-chartjs-2";
import HighPriority from "../../assets/highpriority.png";
import LowPriority from "../../assets/lowpriority.png";

const data = {
  labels: ["High", "Low"],
  datasets: [
    {
      // label: "My First dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 60],
    },
  ],
};

const PriorityButtons = ({ displayHigh, displayLow, high, low, total }) => {
  return (
    <Container>
      <DataContainer>
        <div className="title">
          <p className="total">Total work order</p>

          <p className="total-number">{total}</p>
        </div>
        {/* <div>
          <HorizontalBar data={data} />
        </div> */}
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
  display: flex;
  flex-direction: column;
  .title {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      180deg,
      #4f56e1 0%,
      #6b71ee 42.19%,
      #8a8ffd 100%
    );
    /* background-image: url("../../assets/semicircles.png"); */
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 21px 21px 21px 21px;
    position: absolute;
    top: 0;
    left: 0;
    p {
      font-style: normal;
      font-weight: 500;
      font-size: 3rem;
      line-height: 15px;
      color: #fff;

      margin: 1.1em 0;
      /* text-align: center; */
    }
    .total-number {
      font-size: 6rem;
    }
  }
`;

const ButtonContainer = styled.div`
  /* width: 28vw; */
  min-height: 15vh;
  background: #f3f3f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin: 2em 0;
  padding: 1em 2em;
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
