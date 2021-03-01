import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as OrderActions from "../../store/actions/OrdersActions";
import OrderList from "../../components/dashboard/OrderList";
import Navbar from "../../components/navbar/Navbar";
import { useHistory } from "react-router-dom";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ReactPaginate from "react-paginate";
import PriorityButtons from "../../components/dashboard/PriorityButtons";

const pageOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

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
  const dispatch = useDispatch();
  const history = useHistory();
  const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(1);
  const [priority, setPriority] = useState(priorRedux);
  const [department, setDepartment] = useState("all");

  useEffect(() => {
    const getAllOrders = async () => {
      dispatch(
        OrderActions.getAllOrders(pagination, page, priority, department)
      );
    };
    getAllOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayHighPriority = async () => {
    setPriority(true);
    await dispatch(
      OrderActions.getAllOrders(pagination, page, true, department)
    );
  };

  const displayLowPriority = async () => {
    setPriority(false);
    await dispatch(
      OrderActions.getAllOrders(pagination, page, false, department)
    );
  };

  const onOrderSelect = async (order) => {
    await dispatch(OrderActions.setCurrentOrder(order));
    history.push({
      pathname: `/orders/${order._id}`,
    });
  };

  const fetchDepartmentOrder = (dept) => {
    setDepartment(dept);
    dispatch(OrderActions.getAllOrders(pagination, page, priorRedux, dept));
  };

  const clearSearch = () => {
    dispatch(OrderActions.clearSearchOrders());
  }


  return (
    <Container>
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
        <div>
          <p>Orders per page</p>
          <Dropdown
            defaultValue={pagination}
            className="paginationDD"
            onChange={(v) => setPagination(v.value)}
            options={pageOptions}
          />
        </div>
      </PaginationSection>
      <PriorityButtons
        displayHigh={displayHighPriority}
        displayLow={displayLowPriority}
      />
      {searchOrders.length > 0 ? (
        <RecentWorkOrder>
          <div className="search-title">
            <p className="priority-title">Search Orders : {searchRedux}</p>
            <button onClick={clearSearch}>Clear Search</button>
          </div>
          {searchOrders.length > 0 &&
            searchOrders.map((order, index) => (
              <button key={order._id} onClick={() => onOrderSelect(order)}>
                <OrderList key={order._id} order={order} />
              </button>
            ))}
        </RecentWorkOrder>
      ) : (
          <RecentWorkOrder>
            {priority ? (
              <p className="priority-title">High Prioirty Work orders</p>
            ) : (
                <p className="priority-title">Low Priority work Orders</p>
              )}
            {ordersRedux.length > 0 &&
              ordersRedux.map((order, index) => (
                <button key={order._id} onClick={() => onOrderSelect(order)}>
                  <OrderList key={order._id} order={order} />
                </button>
              ))}
          </RecentWorkOrder>
        )}

      <PageCount>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={3337 / pagination}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(p) => setPage(p.selected)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </PageCount>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  background-color: #e4eaf5;
  button {
    background-color: transparent;
  }

  a {
    color: black;
  }
`;

const RecentWorkOrder = styled.div`
  width: 90%;
  background-color: #e4eaf5;
  margin: 5vh auto;
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
  .search-title{
    display:flex;
    justify-content:space-between;
    button{
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
  p{
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
    flex-direction:column;
    justify-content: center;
   
    .Dropdown-control{
      background:#2E97D2;
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
    background: linear-gradient(180deg, #2ED284 0%, #2CA66B 100%);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
  }
`;
const PageCount = styled.div``;

export default DashboardPage;
