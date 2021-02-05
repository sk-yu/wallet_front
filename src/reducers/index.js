import {combineReducers} from 'redux';
import auth from './AuthReducer';
import wallet from './WalletReducer';

export default combineReducers({
    auth, wallet
});
