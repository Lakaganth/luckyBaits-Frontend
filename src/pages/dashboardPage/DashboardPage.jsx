import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import OrderList from "../../components/dashboard/OrderList";
import Navbar from "../../components/navbar/Navbar";
// import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PriorityButtons from "../../components/dashboard/PriorityButtons";
import InfiniteScroll from "react-infinite-scroll-component";

// const pageOptions = [
//   { value: 10, label: "10" },
//   { value: 20, label: "20" },
//   { value: 30, label: "30" },
//   { value: 40, label: "40" },
//   { value: 50, label: "50" },
// ];

const currentDept = [
  { value: "all", label: "All" },
  { value: "Assembly", label: "Assembly" },
  { value: "Painting", label: "Painting" },
  { value: "Home Worker", label: "Home Worker" },
  { value: "Plating", label: "Plating" },
  { value: "Stamping", label: "Stamping" },
  { value: "Nets", label: "Nets" },
  { value: "Purchasing", label: "Purchasing" },
];

const DashboardPage = () => {
  const ordersRedux = useSelector((state) => state.orders.orders);
  const searchOrders = useSelector((state) => state.orders.searchOrders);
  const priorRedux = useSelector((state) => state.orders.priority);
  const searchRedux = useSelector((state) => state.orders.search);
  const highPriority = useSelector((state) => state.orders.highPriorityOrder);
  const lowPriority = useSelector((state) => state.orders.lowPriorityOrder);
  const totalOrders = useSelector((state) => state.orders.totalOrder);
  const hasMore = useSelector((state) => state.orders.hasMore);
  // const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  // const history = useHistory();
  const [loading, setLoading] = useState(false);
  // const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(1);
  const [priority, setPriority] = useState(priorRedux);
  const [department, setDepartment] = useState("all");

  const fetchDepartmentOrder = (dept) => {
    setDepartment(dept);
    setPage(1);
    dispatch(OrderActions.clearOrders());
    dispatch(OrderActions.filterByDept(25, page, priority, dept));
  };

  useEffect(() => {
    const getAllOrders = async () => {
      setLoading(true);
      dispatch(OrderActions.getAllOrders(25, 1, priority, department));
      setLoading(false);
    };
    getAllOrders();
  }, [page, dispatch, department, priority, searchOrders]);

  const updatePage = (e) => {
    setPage(() => page + 1);
  };

  const displayHighPriority = async () => {
    setPriority(true);
    setPage(1);
    dispatch(OrderActions.clearOrders());
    toast.info("Displaying High Priority orders");
    // await dispatch(OrderActions.getAllOrders(25, page, true, department));
  };

  const displayLowPriority = async () => {
    setPriority(false);
    setPage(1);
    dispatch(OrderActions.clearOrders());
    toast.info("Displaying Low Priority orders");
    // await dispatch(OrderActions.getAllOrders(25, page, false, department));
  };

  // const onOrderSelect = async (order) => {
  //   await dispatch(OrderActions.setCurrentOrder(order));
  //   history.push({
  //     pathname: `/orders/${order._id}`,
  //   });
  // };

  const clearSearch = () => {
    dispatch(OrderActions.clearSearchOrders());
  };

  const handlePriority = (prior, _id, sku) => {
    // dispatch(OrderActions.clearOrders());
    dispatch(OrderActions.setOrderPriority(!prior, _id));
    toast(`Order SKU: ${sku} set to ${!prior ? "High" : "Low"}`);
  };

  const handleDeptTransfer = (dept, curDept, _id, sku) => {
    // dispatch(OrderActions.clearOrders());
    dispatch(OrderActions.transferDept(dept, currentDept, _id));
    toast(`Order SKU: ${sku} transfered from ${curDept} to ${dept} `);
  };

  console.log(searchOrders);

  return (
    <Container>
      <ToastContainer autoClose={3000} />
      <Navbar />
      <h3>Dashboard</h3>
      <PaginationSection>
        <div className="set-department">
          <p>Filter by Department</p>
          <Dropdown
            className="filterDD"
            defaultValue={department}
            onChange={(v) => fetchDepartmentOrder(v.value)}
            options={currentDept}
          />
        </div>
      </PaginationSection>
      <PriorityButtons
        displayHigh={displayHighPriority}
        displayLow={displayLowPriority}
        high={highPriority}
        low={lowPriority}
        total={totalOrders}
      />
      {searchOrders.length > 0 ? (
        <RecentWorkOrder>
          <div className="search-title">
            <p className="priority-title">Search Orders : {searchRedux}</p>
            <button onClick={clearSearch}>Clear Search</button>
          </div>
          {searchOrders.length > 0 &&
            searchOrders.map((order, index) => (
              // <button key={order._id} onClick={() => onOrderSelect(order)}>
              <OrderList
                key={order._id}
                order={order}
                handlePriority={handlePriority}
                handleDeptTransfer={handleDeptTransfer}
              />
              // </button>
            ))}
        </RecentWorkOrder>
      ) : (
        <InfiniteScroll
          dataLength={ordersRedux.length}
          next={updatePage}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <RecentWorkOrder>
            {priority ? (
              <p className="priority-title">High Priority Work orders</p>
            ) : (
              <p className="priority-title">Low Priority work Orders</p>
            )}
            <Header priority={priority} />
            {ordersRedux.length > 0 &&
              ordersRedux.map((order, index) => (
                <OrderList
                  key={index}
                  order={order}
                  handlePriority={handlePriority}
                  handleDeptTransfer={handleDeptTransfer}
                />
              ))}
          </RecentWorkOrder>
        </InfiniteScroll>
      )}
      {loading && <Loading>Loading ...</Loading>}
    </Container>
  );
};

const Header = ({ priority }) => {
  return (
    <Color priority={priority}>
      <p>Priority</p>
      <p>SKU</p>
      <p>Description</p>
      <p>2 Weeks</p>
      <p>4 Weeks</p>
      <p>Department</p>
      <p>Inbound Order QTY</p>
      <p>CAT</p>
      <p>Total Needed</p>
    </Color>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #e4eaf5;
  button {
    background-color: transparent;
  }

  a {
    color: black;
  }
`;
const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;
const Color = styled.div`
  /* background-color: ${({ priority }) =>
    priority === "low"
      ? "rgba(39, 35, 255, 0.55)"
      : "rgba(246, 191, 191, 0.69)"}; */
  background-color: rgba(39, 35, 255, 0.55);
  /* position: relative; */
  min-height: 10vh;
  width: 100%;
  border-radius: 19px;
  margin: 25px 10px;

  display: grid;
  grid-template-columns: repeat(9, 10vw);
  align-content: center;
  justify-content: center;
  text-align: center;
  color: white;
  /* font-size: 1.2rem; */
`;

const RecentWorkOrder = styled.div`
  width: 90vw;
  background-color: #e4eaf5;
  margin: 5vh auto 0 auto;
  padding-bottom: 2vh;
  .priority-title {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 38px;
    line-height: 99.2%;
    /* identical to box height, or 28px */
    text-align: left;
    color: #727272;
  }
  .search-title {
    display: flex;
    justify-content: space-between;
    button {
      background: green;
      border-radius: 10px;
      padding: 1em;
      color: white;
    }
  }
`;

const PaginationSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 15vw;
  margin: 2vh 5vw;
  p {
    font-family: Roboto Medium;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 28px;
    color: rgba(0, 0, 0, 0.58);
  }
  /* text-align: center; */
  .set-department {
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    justify-content: center;

    .Dropdown-control {
      background: #2e97d2;
    }
  }
  .Dropdown-arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .Dropdown-control {
    max-width: max(25%, 200px);
    height: 2em;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background: linear-gradient(180deg, #2ed284 0%, #2ca66b 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
`;
// const PageCount = styled.div``;

export default DashboardPage;
