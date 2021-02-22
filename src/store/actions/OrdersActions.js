import Axios from "axios";

const uri = "https://luckybait.herokuapp.com";

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER = "GET_ORDER";
export const GET_SINGLE_BOM = "GET_SINGLE_BOM";
export const CLEAR_BOM = "CLEAR_BOM";
export const ERROR = "ERROR";

export const getAllOrders = (pagination, page) => {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        `${uri}/order/all?pagination=${pagination}&page=${page}`
      );
      const orders = await response.data;
      return dispatch({ type: GET_ALL_ORDERS, payload: orders });
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
