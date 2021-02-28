import {
  GET_ALL_ORDERS,
  SET_ORDER,
  GET_SINGLE_BOM,
  CLEAR_BOM,
  TRANSFER_DEPT,
  SET_PRIORITY,
  SET_SEARCH,
} from "./../actions/OrdersActions";

const initialState = {
  orders: [],
  order: "",
  bom: "",
  priority: false,
  search: "",
  pagination: 10,
  page: 1,
  filter: "all",
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        priority: action.payload.priority,
      };
    case SET_ORDER:
      return { ...state, order: action.payload };
    case GET_SINGLE_BOM:
      return { ...state, bom: action.payload };
    case CLEAR_BOM:
      return { ...state, bom: "" };
    case TRANSFER_DEPT:
      return { ...state, order: action.payload };
    case SET_PRIORITY:
      return { ...state, order: action.payload };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
