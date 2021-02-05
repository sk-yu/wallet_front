import {GET_ADDRESS_INFO,SET_ADDRESS_INFO, GET_WALLET_INFO, GET_BALANCE} from "../actions/Types";

const initialState = {
    selectAddress:'',
    addresses:[],
    assets:null
    // {
    //     symbol:'',
    //     address:'',
    //     balance
    // }
};

export default function wallet(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
    case GET_ADDRESS_INFO:
        let selected = '';
        if(state.selectAddress === '') {
            if( payload.length !== 0) {
                selected = payload[0];
            }
        }
        return {
            ...state,
            addresses:payload,
            selectAddress:selected
        }
    case SET_ADDRESS_INFO:
        return {
            ...state,
            selectAddress:payload
        }
    case GET_WALLET_INFO:
        return {
            ...state,
            // assets:[...state.assets, payload]
            assets:payload
        }

    case GET_BALANCE:
        const index = state.assets.findIndex(asset => asset.symbol === payload.symbol);
        console.log(index);
        return {
        ...state,
        };
    default:
        return state;
    }
}
