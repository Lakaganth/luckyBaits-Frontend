import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as AuthActions from "../../store/actions/AuthActions";
import DefaultAvatar from "../../assets/svg/avatar_default.svg";
import Searchbar from "./Searchbar";
import { Link, NavLink } from "react-router-dom";
import { useSpring, animated, useTransition } from "react-spring";

const Navbar = () => {
  const authRedux = useSelector((state) => state.auth);
  const { name } = authRedux.user;
  const [isNavOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();

  const menuAnimation1 = useSpring({
    transform: isNavOpen
      ? `translateY(2px) rotate(45deg)`
      : ` translateY(0px) rotate(0deg)`,
  });
  const menuAnimation2 = useSpring({
    transform: isNavOpen
      ? `translateY(-12px) rotate(135deg)`
      : ` translateY(0px) rotate(0deg)`,
  });
  const navAnimation = useTransition(isNavOpen, null, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const logout = async () => {
    await localStorage.setItem("token", "");
    dispatch(AuthActions.sigoutUser());
    setNavOpen(false);
  };

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
      <Link to="/">
        <p>Lucky Strike Bait Works</p>
      </Link>
      <Searchbar />
      <div style={{ zIndex: 30 }} onClick={() => setNavOpen(!isNavOpen)}>
        <MobileMenu1 style={menuAnimation1}></MobileMenu1>
        <MobileMenu2 style={menuAnimation2}></MobileMenu2>
      </div>
      {navAnimation.map(({ item, key, props }) =>
        item ? (
          <NavDropDown style={props} key={key}>
            <NavLink to="/" onClick={() => setNavOpen(false)}>
              Dashboard
            </NavLink>
            <NavLink to="/upload" onClick={() => setNavOpen(false)}>
              Upload Orders
            </NavLink>
            <NavLink to="/uploadBom" onClick={() => setNavOpen(false)}>
              Upload BOM
            </NavLink>
            <button onClick={logout}>Log Out</button>
          </NavDropDown>
        ) : null
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 60px;
  background: #f2f2f2;
  padding: 0 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow-x: hidden;

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
    /* line-height: 21px; */
    text-transform: capitalize;
  }
`;

const NavDropDown = styled(animated.div)`
  position: sticky;
  left: 10vw;
  top: 0;

  padding: 100px;
  background: #524763;
  height: 100vh;
  width: 100vw;
  z-index: 20;

  a {
    display: block;
    text-align: left;
    font-size: 4rem;
    color: white;
    text-decoration: none;
    transition: 0.3s ease border;
    border-bottom: solid 4px transparent;
    &:hover {
      border-bottom: solid 4px #82d8d8;
    }
  }
  button {
    display: block;
    text-align: left;
    font-size: 4rem;
    color: white;
    text-decoration: none;
    transition: 0.3s ease border;
    border-bottom: solid 4px transparent;
    &:hover {
      border-bottom: solid 4px #82d8d8;
    }
  }
`;

const MobileMenu1 = styled(animated.div)`
  background-color: #0f0f0f;
  height: 4px;
  width: 35px;
  margin: 10px 0;
  z-index: 20;
`;
const MobileMenu2 = styled(animated.div)`
  background-color: #0f0f0f;
  height: 4px;
  width: 35px;
  margin: 10px 0;
  z-index: 20;
`;

export default Navbar;
