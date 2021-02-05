import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT} from "../actions/Types";
  
// const user = JSON.parse(localStorage.getItem("user"));

const initialState = {token:''}

export default function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case LOGIN_SUCCESS:
        localStorage.setItem("authorization", payload.token);
        return {
        ...state,
        token: payload.token,
        };
    case LOGIN_FAIL:
        localStorage.clear();
        return {
        ...state,
        token: null,
        };
    case LOGOUT:
        localStorage.clear();
        return {
        ...state,
        token: null,
        };
    // case JWT_SUCCESS:
    //     return {
    //     ...state,
    //     isLoggedIn: true,
    //     };
    // case JWT_FAIL:
    //     return {
    //     ...state,
    //     isLoggedIn: false,
    //     user: null,
    //     };
    default:
        return state;
    }
}
