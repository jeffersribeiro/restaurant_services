import axios from 'axios';

const api = axios.create({
    baseURL:'http://localhost.com:3333'
})

export default api;