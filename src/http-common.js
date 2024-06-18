import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'http://140.238.201.7:8080',
    headers: {
        'Content-type': 'application/json',
    },
});