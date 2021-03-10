import {
  GET_ALL_ORDERS,
  SET_ORDER,
  GET_SINGLE_BOM,
  CLEAR_BOM,
  TRANSFER_DEPT,
  SET_PRIORITY,
  SET_SEARCH,
  GET_SEARCH_ORDERS,
  CLEAR_SEARCH,
  CLEAR_ORDERS,
  GET_DEPT_ORDER,
  DELETE_ALL_ORDERS,
} from "./../actions/OrdersActions";

const initialState = {
  orders: [],
  orderLength: 0,
  searchOrders: [],
  deptOrder: [],
  order: "",
  bom: "",
  priority: false,
  search: "",
  pagination: 10,
  page: 1,
  filter: "all",
  totalOrder: 0,
  highPriorityOrder: 0,
  lowPriorityOrder: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      console.log(action.payload.orders.countData.count);
      return {
        ...state,
        orders: [...state.orders, ...action.payload.orders.order],
        orderLength: action.payload.orders.orderLength,
        totalOrder: action.payload.orders.countData.docCount,
        highPriorityOrder: action.payload.orders.countData.highOrderCount,
        lowPriorityOrder: action.payload.orders.countData.lowOrderCount,
        priority: action.payload.priority,
      };
    case GET_DEPT_ORDER:
      return {
        ...state,
        orders: [...state.orders, ...action.payload.orders.order],
        orderLength: action.payload.orders.orderLength,
        totalOrder: action.payload.deptOrders.countData.docCount,
        highPriorityOrder: action.payload.deptOrders.countData.highOrderCount,
        lowPriorityOrder: action.payload.deptOrders.countData.lowOrderCount,
      };
    case DELETE_ALL_ORDERS:
      return {
        ...state,
        orders: [],
        orderLength: 0,
        totalOrder: 0,
        highPriorityOrder: 0,
        lowPriorityOrder: 0,
      };
    case SET_ORDER:
      return { ...state, order: action.payload };
    case GET_SEARCH_ORDERS:
      return { ...state, searchOrders: action.payload };
    case GET_SINGLE_BOM:
      return { ...state, bom: action.payload };
    case CLEAR_BOM:
      return { ...state, bom: "" };
    case TRANSFER_DEPT:
      return { ...state, order: action.payload };
    case SET_PRIORITY:
      return {
        ...state,
        order: action.payload.order,
        totalOrder: action.payload.docCount,
        highPriorityOrder: action.payload.highOrderCount,
        lowPriorityOrder: action.payload.lowOrderCount,
      };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case CLEAR_ORDERS:
      return { ...state, orders: [] };
    case CLEAR_SEARCH:
      return { ...state, search: "", searchOrders: [] };
    default:
      return state;
  }
};

export default orderReducer;
