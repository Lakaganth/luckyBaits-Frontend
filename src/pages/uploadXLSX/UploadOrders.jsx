import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";

const UploadOrders = () => {
  const [data, setData] = useState([]);
  const [mappedData, setMappedData] = useState([]);
  const [errorxl, setErr] = useState("");

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
        setData(data);
      };
    } catch (err) {
      setErr(err);
    }
  };
  console.log(errorxl);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mappedOrderData = data.map((s) => {
      const SKU = s.SKU;
      const Description = s.Description;
      const Weeks2 = s["Need 0-6"] + s["Need 7-13"];
      const Weeks4 =
        s["Need 0-6"] + s["Need 7-13"] + s["Need 14-20 "] + s["Need 21-27"];
      const IOQty = s["Inbound Orders"];
      const Cat = s.Cat;
      const totalNeeded = s["Total Needed"];
      return {
        SKU,
        Description,
        Weeks2,
        Weeks4,
        IOQty,
        Cat,
        totalNeeded,
      };
    });
    // console.log(mappedOrderData)
    setMappedData(mappedOrderData);
  };
  // console.log(mappedData, errorxl)

  const handleUpload = () => {
    dispatch(OrderActions.deleteOrders());
    dispatch(OrderActions.uploadOrders(mappedData));
  };
  return (
    <Container>
      <Navbar />
      <h3>Upload Orders Sheet</h3>
      <UploadSection>
        <input type="file" name="Upload" onChange={handleChange} />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </UploadSection>
      {mappedData.length > 0 && (
        <UploadButton>
          <button onClick={handleUpload}>Upload</button>
        </UploadButton>
      )}
      {mappedData.length > 0 && (
        <TableSection>
          <table className="table container">
            <thead>
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Description</th>
                <th scope="col">2 Weeks</th>
                <th scope="col">4 Weeks</th>
                <th scope="col">IO Qty</th>
                <th scope="col">Cat</th>
                <th scope="col">Total Needed</th>
              </tr>
            </thead>
            <tbody>
              {mappedData.map((d) => (
                <tr key={d.SKU}>
                  <th key={d.SKU}>{d.SKU}</th>
                  <td>{d.Description}</td>
                  <td>{d.Weeks2}</td>
                  <td>{d.Weeks4}</td>
                  <td>{d.IOQty}</td>
                  <td>{d.Cat}</td>
                  <td>{d.totalNeeded}</td>
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
export default UploadOrders;
