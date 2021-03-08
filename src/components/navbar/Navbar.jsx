import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// import * as AuthActions from "../../store/actions/AuthActions";
import DefaultAvatar from "../../assets/svg/avatar_default.svg";
import MenuIcon from "../../assets/svg/menu_icon.svg";
import Searchbar from "./Searchbar";

const Navbar = () => {
  const authRedux = useSelector((state) => state.auth);
  const { name } = authRedux.user;

  return (
    <Container>
      <UserGroup>
        <Avatar>
          <img src={DefaultAvatar} alt="default-avatar" />
        </Avatar>
        <Name>
          <p>{name}</p>
        </Name>
      </UserGroup>
      <p>Lucky Strike Bait Works</p>
      <Searchbar />
      <div>
        <img src={MenuIcon} alt="" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background: #f2f2f2;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 21px;
    text-transform: capitalize;
  }
`;
const UserGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 130px;
`;
const Avatar = styled.div`
  width: 50px;
  border-radius: 50%;
  background-color: #fff;
  img {
    width: 90%;
  }
`;
const Name = styled.div`
  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    text-transform: capitalize;
  }
`;

export default Navbar;
