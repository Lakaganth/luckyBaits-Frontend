import {
  GET_ALL_ORDERS,
  GET_SINGLE_BOM,
  CLEAR_BOM,
} from "./../actions/OrdersActions";

const initialState = {
  orders: [],
  order: "",
  bom: "",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return { ...state, orders: action.payload };
    case GET_SINGLE_BOM:
      return { ...state, bom: action.payload };
    case CLEAR_BOM:
      return { ...state, bom: "" };

    default:
      return state;
  }
};

export default orderReducer;
