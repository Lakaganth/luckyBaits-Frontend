import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SKUButton = ({ sku }) => {
  const history = useHistory();

  return (
    <Container>
      <p className="title">SKU</p>

      <button
        onClick={() =>
          history.push({
            pathname: `/bom/${sku}`,
          })
        }
      >
        <div>{sku}</div>
      </button>
      <p className="sub">Tap to view Bill of Materials</p>
    </Container>
  );
};

const Container = styled.div`
  max-width: max(80%, 15em);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 1.5rem;
    line-height: 99.2%;
    margin-bottom: 0.2em;
  }
  button {
    width: 100%;
    height: 3em;
    margin: 0 0 0.3em 0;
    background: linear-gradient(
      180deg,
      #267e74 0%,
      rgba(41, 90, 84, 0.97) 100%
    );
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 99.2%;
    /* or 39px */

    text-align: center;

    color: #e4e4f1;
  }
  .sub {
    font-family: Roboto;
    font-style: normal;
    font-weight: 200;
    font-size: 20px;
    line-height: 99.2%;
    /* identical to box height, or 20px */

    text-align: center;

    color: rgba(0, 0, 0, 0.7);
  }
`;

export default SKUButton;
