import axios from 'axios';

export default axios.create({
    baseURL: 'https://mblog-api.herokuapp.com'
});