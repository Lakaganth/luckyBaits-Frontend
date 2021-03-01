import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "../../assets/search_icon.png";
import CloseIcon from "../../assets/close.png";
import { useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  // const searchRedux = useSelector((state) => state.orders.search);
  const dispatch = useDispatch();
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.length > 0) {
      await dispatch(OrderActions.setSearch(search));
      await fetchSearchResults();
    }
  };

  const fetchSearchResults = () => {
    dispatch(OrderActions.searchOrders(search));
    setSearch("");
  };

  return (
    <Container onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        {search.length > 0 ? (
          <img src={CloseIcon} alt="Close icon" />
        ) : (
          <img src={SearchIcon} alt="Search icon" />
        )}
      </button>
    </Container>
  );
};
const Container = styled.form`
  width: 25vw;
  height: 80%;
  background: #dddddd;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    width: 85%;
    height: 100%;
    border-radius: 25px;
    outline: none;
    padding: 0 25px;
    border: none;
    font-size: 1rem;
    background: #dddddd;
  }
  img {
    margin-right: 15px;
  }
`;
export default Searchbar;
