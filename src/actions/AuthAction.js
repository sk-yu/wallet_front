import {LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,JWT_SUCCESS,JWT_FAIL} from '../actions/Types';
import AuthService from '../services/AuthService';

export const loginAction = (id, password) => (dispatch) => {
    return AuthService.signin(id, password).then(
    (data) => {
        // console.log(data);
        if(data.result===true) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: { token: data.token },
                });
            return Promise.resolve(data);
        }
        else {
            dispatch({
                type: LOGIN_FAIL,
            });
            return Promise.reject(data);
        }
        
    },
    (error) => {
        // const message =
        // (error.response &&
        //     error.response.data &&
        //     error.response.data.message) ||
        // error.message ||
        // error.toString();

        dispatch({
            type: LOGIN_FAIL,
        });

        return Promise.reject(error);
    }
    );
};

export const logout = () => (dispatch) => {
    // AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
    return Promise.resolve();
  };

//   export const jwtCheck = (token) => (dispatch) =>{
//     return AuthService.jwtVerify(token).then(
//         (response) => {
//             // console.log(response);
//             if(response.result==='true'){
//                 dispatch({
//                     type:JWT_SUCCESS
//                 })
//                 return Promise.resolve();
//             }else{
//                 dispatch({
//                     type:JWT_FAIL
//                 })
//                 return Promise.reject();
//             }
//         });
//   }