import axios from 'axios';

const request = axios.create({
    baseURL:'https://cnodejs.org/api/v1',
    timeout:5000
});

export default request