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

const pageOptions = [
  { value: 10, label: "10" },
  { value: 20, label: "20" },
  { value: 30, label: "30" },
  { value: 40, label: "40" },
  { value: 50, label: "50" },
];

const DashboardPage = () => {
  const ordersRedux = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  // const history = useHistory();
  const [pagination, setPagination] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getAllOrders = async () => {
      console.log("Hello");
      dispatch(OrderActions.getAllOrders(pagination, page));
    };
    getAllOrders();
  }, [pagination, dispatch, page]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  console.log(page);
  return (
    <Container>
      <Navbar />
      <h3>Dashboard</h3>
      <PaginationSection>
        <div />
        <div>
          <p>Orders per page</p>
          <Dropdown
            defaultValue={pagination}
            onChange={(v) => setPagination(v.value)}
            options={pageOptions}
          />
        </div>
      </PaginationSection>
      <RecentWorkOrder>
        {ordersRedux.length > 0 &&
          ordersRedux.map((order, index) => (
            // <button
            //   key={order._id}
            //   onClick={() =>
            //     history.push({
            //       pathname: `/orders/${order._id}`,
            //       order: { order },
            //     })
            //   }
            // >
            <OrderList key={order._id} order={order} />
            /* </button> */
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
  margin: 0 auto;
`;

const PaginationSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 15vw;
  margin: 0 5vw;
  text-align: center;
`;
const PageCount = styled.div``;

export default DashboardPage;
