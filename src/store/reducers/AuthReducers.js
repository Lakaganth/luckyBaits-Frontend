import { SIGNIN_USER } from "../actions/AuthActions";



const initialState = {
    user: "",
    token:"",
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGNIN_USER:
        return {...state, user: action.payload.user, token: action.payload.token}
        default:
        return state;
    }
}

export default authReducer;