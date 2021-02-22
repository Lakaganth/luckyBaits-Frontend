import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import Collapse from "../../assets/collapse.png";

const SkuDetailPAge = (props) => {
  let { sku } = useParams();
  const dispatch = useDispatch();
  const bomRedux = useSelector((state) => state.orders.bom);
  useEffect(() => {
    dispatch(OrderActions.getBOM(sku));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const goBack = async () => {
    dispatch(OrderActions.clearReduxBOM);
    props.history.goBack();
  };

  return (
    <Container>
      <Navbar />
      <BomContainer>
        <BOMheading>
          <h2>Bill of Materials</h2>
          <button onClick={goBack}>
            <img src={Collapse} alt="Close" />
          </button>
        </BOMheading>
        <Metadata>
          <LabelBoxComponent
            label="SKU"
            width="180px"
            height="100px"
            content={bomRedux.sku}
          />
          <LabelBoxComponent
            label="Description"
            width="380px"
            height="100px"
            content={bomRedux.skuComponent}
          />
        </Metadata>
        <CompTitle>
          <p>Component</p>
          <p>Component Description</p>
          <p>Component QTY</p>
        </CompTitle>
        <CompData>
          {bomRedux &&
            bomRedux.comps.map((comp) => (
              <ComponentRow key={comp._id} c={comp} />
            ))}
        </CompData>
      </BomContainer>
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

const ComponentRow = (c) => {
  const { component, component_description, component_qty } = c.c;
  return (
    <>
      <CompContainer>
        <p>{component}</p>
        <p>{component_description}</p>
        <p>{component_qty}</p>
      </CompContainer>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #e4eaf5;
  padding-bottom: 10vh;
  button {
    background-color: transparent;
  }

  a {
    color: black;
  }
`;

const BomContainer = styled.div`
  width: 80vw;
  min-height: 80vh;
  margin: 5vh auto;
  padding: 2vh 2vw;
  background: #fffbfb;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 19px;
  margin-bottom: 10vh;
`;

const BOMheading = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  justify-items: center;
  h2 {
    font-family: Roboto;
    line-height: 39px;
    text-align: center;
    letter-spacing: 0.135em;
    font-size: 40px;
  }
`;

const Metadata = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  padding: 5vh 0;
`;

const CompData = styled.div`
  margin: 2vh auto;
`;
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
  margin: 2vh 0;
  background: #d2ffdf;
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

const LabeledBox = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

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
  font-size: 25px;
  /* line-height: 99.2%; */
  text-transform: capitalize;
  text-align: center;
  padding: 3vh 0;
  color: #e4e4f1;
`;

export default SkuDetailPAge;
