import Axios from "axios";


const uri  = 'https://luckybait.herokuapp.com';

export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const GET_ORDER = "GET_ORDER";
export const ERROR = "ERROR";

export const getAllOrders = () => {
    return async (dispatch) => {
        try {
           const response = await Axios.get(`${uri}/order/all`);
            const orders = await response.data;
             return dispatch({type: GET_ALL_ORDERS,payload: orders});

        } catch (err) {
            return dispatch({type: ERROR, payload: err});
        }
    }
}