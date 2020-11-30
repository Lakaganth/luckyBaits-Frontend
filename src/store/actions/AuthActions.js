
import  Axios  from 'axios';

export const  SIGNIN_USER = "SIGNIN_USER";
export const  REGISTER_USER = "REGISTER_USER";
export const ERROR = "ERROR";

const uri  = 'https://luckybait.herokuapp.com';

export const signinUser = (name, password) => {
    return async dispatch => {
        try {
            const user = {
                name : name,
                password: password
            }
                     
            const response = await Axios.post(`${uri}/user/login`, user);
            const result = response.data;
            console.log(response.data);
            return dispatch({type: SIGNIN_USER, payload: result})
        } catch (err) {
            return dispatch({type: ERROR, payload: err});
        }
    }
}

