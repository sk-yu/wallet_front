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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    signin
}