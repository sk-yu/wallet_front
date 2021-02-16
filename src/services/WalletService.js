import axios from "axios";

const addressInfo = () => {
    console.log('addressInfo token : '+ localStorage.authorization);
    return axios
    .get(`/api/v1/account/address`, {
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log('addressInfo() : ');
        // console.log(res.data);
        return res.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    }) 
}

const walletInfo = (address) => {
    // console.log('walletInfo token : '+ localStorage.authorization);
    return axios
    .get(`/api/v1/account/wallets`, {
        params:{address},        
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log('walletInfo() : ');
        // console.log(res.data);
        return res.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    }) 
}

const balance = (address) => {
    // console.log('balance token : '+ localStorage.authorization);
    return axios
    .get(`/api/v1/eth/balance`, {
        params:{address},    
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log(res.data);
        return {
            amount:res.data.data.amount,
            result:res.data.result
        }
    })
    .catch(error => {
        console.error(error);
        return error;
    }) 
}

const transfer = (reqBody) => {
    // console.log('transfer eth : '+ localStorage.authorization)
    return axios
    .post(`/api/v1/eth/transfer`, reqBody, {
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log(res.data);
        return res.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    }) 
}

const transferToken = (reqBody) => {
    // console.log('transfer token : '+ localStorage.authorization)
    return axios
    .post(`/api/v1/token/transfer`, reqBody, {
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log(res.data);
        return res.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    }) 
}

const getHistorys = () => {
    // console.log('getHistorys token : '+ localStorage.authorization)
    return axios
    .get(`/api/v1/history`, {
        headers:{'x-access-token':localStorage.authorization}
    })
    .then(res => {
        // console.log(res.data);
        return res.data;

        
    })
    .catch(err => {
        console.log(err);
    }) 
}

//async await 방식 추가
const addToken = async (reqBody) => {
    try{
        const res = await axios.post(`/api/v1/token/add`, reqBody, {
            headers:{'x-access-token':localStorage.authorization}
        });
        return res;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
}

const addAddress = async (reqBody) => {
    try {
        const res = await axios.post(`/api/v1/eth/address`, reqBody, {
            headers:{'x-access-token':localStorage.authorization}
        });
        return res;
    }
    catch(error) {
        console.error(error);
        throw error;
    }
} 


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addressInfo, walletInfo, balance, transfer, transferToken, getHistorys,
    addToken, addAddress
}