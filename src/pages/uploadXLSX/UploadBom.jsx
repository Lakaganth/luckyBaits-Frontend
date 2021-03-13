import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";

const UploadBom = () => {
  const [bomDataXL, setbBomDataXL] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const file = e.target.files[0];
    readExcel(file);
  };

  const readExcel = async (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    try {
      fileReader.onload = async (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        setbBomDataXL(data);
      };
    } catch (err) {
      setErr(err);
    }
  };
  console.log(err);

  const handleSubmit = (e) => {
    e.preventDefault();
    let bomArr = [];

    let bomObj = {};
    bomObj.comps = [];
    setLoading(true);
    for (let i = 0; i < bomDataXL.length; i++) {
      if (!bomDataXL[i].hasOwnProperty("sku")) {
        bomObj.comps.push(bomDataXL[i]);
      } else {
        bomObj.sku = bomDataXL[i].sku;
        bomObj.skuComponent = bomDataXL[i].component;
        bomObj.skuComponentQty = bomDataXL[i].component_qty;
        bomArr.push(bomObj);
        bomObj = {};
        bomObj.comps = [];
      }
    }

    // console.log(mappedOrderData)
    setMappedData(bomArr);
    setLoading(false);
  };
  const handleUpload = () => {
    dispatch(OrderActions.deleteBom());
    dispatch(OrderActions.uploadBom(mappedData));
  };

  return (
    <Container>
      <Navbar />
      <h3>Upload Bill of Materials</h3>
      <UploadSection>
        <input type="file" name="Upload" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </UploadSection>
      {loading ? <h1>Loading...</h1> : ""}
      {mappedData.length > 0 && (
        <UploadButton>
          <button onClick={handleUpload}>Upload</button>
        </UploadButton>
      )}
      {mappedData.length > 0 && (
        <TableSection className="table-responsive">
          <table className="table container table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Sku Component</th>
                <th scope="col">QTY</th>
              </tr>
            </thead>
            <tbody>
              {mappedData.map((d) => (
                <tr key={d.sku}>
                  <th>{d.sku}</th>
                  <td>{d.skuComponent}</td>
                  <td>{d.skuComponentQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableSection>
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #e4eaf5;
  h3 {
    text-align: center;
    text-transform: uppercase;
    font-size: 1.4rem;
    margin: 1.2em 0;
  }
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-size: 5.4rem;
    margin: 1.2em 0;
  }
  a {
    color: black;
  }
`;

const UploadSection = styled.div`
  margin: 10vh 5vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  button {
    width: 25%;
    margin: 30px 0;
    padding: 0.5em 0;
    font-size: 1.2rem;
    border-radius: 10px;
    background: linear-gradient(180deg, #2ed284 0%, #2ca66b 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;
const UploadButton = styled.div`
  width: 80%;
  margin: 0 auto;
  button {
    width: 100%;
    margin: 1.2em auto;
    padding: 0.5em 0;
    font-size: 1.2rem;
    border-radius: 10px;
    color: white;
    background-color: rgba(39, 35, 255, 0.55);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const TableSection = styled.div`
  text-align: center;
  td {
    padding: 0.3em 1.2em;
  }
`;
export default UploadBom;
