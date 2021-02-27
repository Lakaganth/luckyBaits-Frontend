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
  const priorRedux = useSelector((state) => state.orders.priority);
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

  return (
    <Container>
      <Navbar />
      <h3>Dashboard</h3>
      <PaginationSection>
        <div className="set-department">
          <p>Department</p>
          <Dropdown
            defaultValue={department}
            onChange={(v) => fetchDepartmentOrder(v.value)}
            options={currentDept}
          />
        </div>
        <div>
          <p>Orders per page</p>
          <Dropdown
            defaultValue={pagination}
            onChange={(v) => setPagination(v.value)}
            options={pageOptions}
          />
        </div>
      </PaginationSection>
      <PriorityButtons
        displayHigh={displayHighPriority}
        displayLow={displayLowPriority}
      />
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
`;

const PaginationSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 15vw;
  margin: 0 5vw;
  text-align: center;
  .set-department {
    width: 50%;
  }
`;
const PageCount = styled.div``;

export default DashboardPage;
