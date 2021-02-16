import axios from "axios";

const signin = (email, password) => {
    return axios
    .post(`/api/v1/account/signin`, {email, password})
    .then(res => {
        // console.log(res.data);
        return {
            token:res.data.token,
            result:res.data.result
        }
    })
    .catch(err => {
        console.log(err);
    }) 
}

const signup = async (email, password, passphase) => {
    try{
        const res = await axios.post(`/api/v1/account/signup`, {email, password, passphase});
        return res;
    } 
    catch(error) {
        throw error;
    }
    
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    signin, signup
}