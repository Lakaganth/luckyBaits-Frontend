import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/AuthActions";
import { Container } from "../styles/globalStyles";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const authRedux = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    dispatch(AuthActions.signinUser(name, password));
    if (localStorage.token != null) {
      history.push("/");
    }
  };
  return (
    <Container>
      <Contents>
        <h3>Lucky Strike Baits</h3>
        <InputGroup>
          <p>Name</p>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Name"
            onChange={(name) => setName(name.target.value)}
          />
          <p>Password</p>
          <input
            type="text"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(password) => setPassword(password.target.value)}
          />
        </InputGroup>
        <button onClick={handleSubmit}>
          {authRedux.token == null ? "Enter App" : "Login"}
        </button>
      </Contents>
    </Container>
  );
};

const Contents = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  h3 {
    font-family: "Red Hat Display", sans-serif;
    color: white;
    font-weight: 400;
    font-size: 60px;
    padding-top: 100px;
    text-align: center;
    text-transform: uppercase;
  }

  button {
    width: 155px;
    height: 50px;
    background-color: #fff;
    color: #303030;
    font-family: "Red Hat Display", sans-serif;
    font-weight: 100;
    font-size: 30px;
    border: none;
    border-radius: 5px;
  }
`;

const InputGroup = styled.div`
  width: 80%;
  margin: 8vh auto;

  p {
    text-align: center;
    color: rgba(255, 255, 255, 0.57);
    font-family: "Roboto", sans-serif;
    font-weight: 100;
    letter-spacing: 0.28em;
    font-size: 42px;
  }

  input {
    width: 100%;
    height: 8vh;
    margin: 2vh 0;
    padding-left: 2vw;
    border: none;
    border-radius: 8px;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    letter-spacing: 0.18em;
    font-size: 24px;
  }
  input:focus {
    outline: none !important;
  }
`;

export default LoginPage;
