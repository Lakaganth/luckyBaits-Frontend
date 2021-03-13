import Axios from "axios";

export const SIGNIN_USER = "SIGNIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SIGNOUT_USER = "SIGNOUT_USER";
export const ERROR = "ERROR";

const uri = "https://luckybait.herokuapp.com";

export const signinUser = (name, password) => {
  return async (dispatch) => {
    try {
      const user = {
        name: name,
        password: password,
      };
      const response = await Axios.post(`${uri}/user/login`, user);
      const result = response.data;
      localStorage.setItem("token", result.token);
      return dispatch({ type: SIGNIN_USER, payload: result });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};

export const sigoutUser = () => {
  return async (dispatch) => {
    try {
      //   await Axios.post(`${uri}/user/logout`);
      localStorage.setItem("token", "");
      return dispatch({ type: SIGNOUT_USER });
    } catch (err) {
      return dispatch({ type: ERROR, payload: err });
    }
  };
};
