import {GET_ADDRESS_INFO, SET_ADDRESS_INFO, GET_WALLET_INFO} from '../actions/Types';
import WalletService from '../services/WalletService';
// import axios from "axios"; 

export const addressInfoAction = () => (dispatch) => {
    return WalletService.addressInfo().then(
        (data) => {
            // console.log(data);
            dispatch({
                type: GET_ADDRESS_INFO,
                payload: data.data.address
            });
            return Promise.resolve();
        },
        (error) => {
            console.error(error);
            return Promise.reject(error);
        }
    )
};

export const addressSetAction = (address) => {
    return {
        type: SET_ADDRESS_INFO,
        payload: address
    }
};

export const walletInfoAction = (address) => (dispatch) => {
    return WalletService.walletInfo(address).then(
        (data) => {
            dispatch({
                type: GET_WALLET_INFO,
                payload: data.data
            });
            return Promise.resolve(data);
        },
        (error) => {
            return Promise.reject(error);
        }
    )
};



// export const balance = async (token) => {
//     const resData = await axios.get(`/api/v1/account/balance`, {
//         headers:{'x-access-token':token}  });

//     // console.log(resData.data);
//     return {
//         type: GET_BALANCE,
//         payload: { amount:resData.data.data.amount }
//     }
// };

// export const walletInfoAction = async (token) => {
//     const resData = await axios.get(`/api/v1/account/wallet`, {
//         headers:{'x-access-token':token}  });

//     // console.log(resData.data);
//     return {
//         type: GET_WALLET_INFO,
//         payload: { symbol: resData.data.data.symbol, address:resData.data.data.address }
//     }
// };

// export const balance = async (token) => {
//     const resData = await axios.get(`/api/v1/account/balance`, {
//         headers:{'x-access-token':token}  });

//     // console.log(resData.data);
//     return {
//         type: GET_BALANCE,
//         payload: { symbol: resData.data.data.symbol, amount:resData.data.data.amount }
//     }
// };