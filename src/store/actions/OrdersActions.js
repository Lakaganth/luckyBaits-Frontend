import Axios from "axios";

const uri = "https://luckybait.herokuapp.com";
// const uri = "http://localhost:5000";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ALL_ORDERS_STOP = "GET_ALL_ORDERS_STOP";
export const GET_ORDER = "GET_ORDER";
export const GET_DEPT_ORDER = "GET_DEPT_ORDER";
export const SET_ORDER = "SET_ORDER";
export const GET_SEARCH_ORDERS = "GET_SEARCH_ORDERS";
export const GET_SINGLE_BOM = "GET_SINGLE_BOM";
export const TRANSFER_DEPT = "TRANSFER_DEPT";
export const SET_PRIORITY = "SET_PRIORITY";
export const CLEAR_BOM = "CLEAR_BOM";
export const SET_SEARCH = "SET_SEARCH";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const CLEAR_ORDERS = "CLEAR_ORDERS";
export const DELETE_ALL_ORDERS = "DELETE_ALL_ORDERS";
export const DELETE_ALL_BOM = "DELETE_ALL_BOM";
export const ERROR = "ERROR";

export const uploadOrders = (orderList) => {
  return async (dispatch) => {
    console.log(orderList.length);
    let i,
      j,
      temparray,
      chunk = 100;
    let response,
      orders = [];
    for (i = 0, j = orderList.length; i < j; i += chunk) {
      temparray = orderList.slice(i, i + chunk);
      // console.log(temparray);
      response = await Axios.post(`${uri}/order/uploadorders`, temparray);
      // console.log(response.data)
      orders.push(...response.data);
    }

    // const orders = response.data;
  };
};

export const uploadBom = (BomList) => {
  return async (dispatch) => {
    console.log(BomList.length);
    let i,
      j,
      temparray,
      chunk = 50;
    let response,
      orders = [];
    for (i = 0, j = BomList.length; i < j; i += chunk) {
      temparray = BomList.slice(i, i + chunk);
      console.log(temparray);
      response = await Axios.post(`${uri}/order/uploadBom`, temparray);
      // console.log(response.data)
      orders.push(...response.data);
    }
  };
};

export const deleteOrders = () => {
  return async (dispatch) => {
    await Axios.get(`${uri}/order/deleteorders`);
    return dispatch({ type: DELETE_ALL_ORDERS });
  };
};

export const deleteBom = () => {
  return async (dispatch) => {
    await Axios.get(`${uri}/order/deleteBom`);
  };
};

export const getAllOrders = (pagination = 25, page, priority, filter) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `${uri}/order/all?pagination=${pagination}&page=${page}&prior=${priority}&filter=${filter}&search=`
      );
      const orders = await response.data;
      if (orders.orderLength > 24) {
        return dispatch({
          type: GET_ALL_ORDERS,
          payload: { orders, priority },
        });
      } else {
        return dispatch({
          type: GET_ALL_ORDERS_STOP,
          payload: { orders, priority },
        });
      }
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const filterByDept = (pagination = 25, page, priority, filter) => {
  return async (dispatch) => {
    try {
      if (filter !== "all") {
        const response = await Axios.get(
          `${uri}/order/all?pagination=${pagination}&page=${page}&prior=${priority}&filter=${filter}&search=`
        );

        const deptOrders = await response.data;

        return dispatch({ type: GET_DEPT_ORDER, payload: deptOrders });
      } else {
        console.log("all dept", filter);
        const response = await Axios.get(
          `${uri}/order/all?pagination=${pagination}&page=${page}&prior=${priority}&filter=${filter}&search=`
        );
        const orders = await response.data;
        return dispatch({
          type: GET_ALL_ORDERS,
          payload: { orders, priority },
        });
      }
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const clearOrders = () => {
  return async (dispatch) => {
    try {
      return dispatch({ type: CLEAR_ORDERS });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const searchOrders = (term) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `${uri}/order/all?pagination=10&page=1&search=${term}`
      );
      const orders = await response.data;
      return dispatch({ type: GET_SEARCH_ORDERS, payload: orders });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const clearSearchOrders = () => {
  return async (dispatch) => {
    try {
      return dispatch({ type: CLEAR_SEARCH });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};
export const setCurrentOrder = (order) => {
  return async (dispatch) => {
    try {
      return dispatch({ type: SET_ORDER, payload: order });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};
export const getBOM = (sku) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(`${uri}/bom/${sku}`);
      const bom = await response.data;
      return dispatch({ type: GET_SINGLE_BOM, payload: bom });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const clearReduxBOM = () => {
  return async (dispatch) => {
    try {
      return dispatch({ type: CLEAR_BOM });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const transferDept = (newCurrDept, prevDept, orderId) => {
  return async (dispatch) => {
    try {
      const transObj = {
        currentDept: newCurrDept,
        transfers: {
          currentDept: newCurrDept,
          availDept: prevDept,
        },
      };
      console.log(transObj);

      const response = await Axios.patch(
        `${uri}/order/transfer/${orderId}`,
        transObj
      );

      const order = await response.data;

      console.log(order);
      return dispatch({ type: TRANSFER_DEPT, payload: order });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const setOrderPriority = (prior, id) => {
  return async (dispatch) => {
    try {
      const response = await Axios.post(
        `${uri}/order/priority/${id}?prior=${prior}`
      );
      const order = await response.data;
      return dispatch({ type: SET_PRIORITY, payload: order });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const setSearch = (term) => {
  return async (dispatch) => {
    try {
      return dispatch({ type: SET_SEARCH, payload: term });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};
