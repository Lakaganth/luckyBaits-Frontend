import React, { useState } from "react";
import styled from "styled-components";
import * as XLSX from "xlsx";

const UploadXlsx = () => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

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
      console.log(err);
      setErr(err);
    }
  };
  console.log(data, err);
  return (
    <Container>
      <input type="file" name="Upload" onChange={handleChange} />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  margin: 10%;
  background-color: #e4eaf5;
  button {
    background-color: transparent;
  }

  a {
    color: black;
  }
`;

export default UploadXlsx;
