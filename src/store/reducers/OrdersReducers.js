
import { GET_ALL_ORDERS } from './../actions/OrdersActions';

const initialState = {
    orders: [],
    order: "",
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_ORDERS:       
        return {...state, orders: action.payload}
        default:
        return state;

    }
}

export default orderReducer;