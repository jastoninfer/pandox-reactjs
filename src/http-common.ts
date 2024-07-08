import axios from 'axios';

export default axios.create({
    baseURL:
        (process.env.NODE_ENV === 'development' &&
            process.env.REACT_APP_BASE_URL_DEV) ||
        process.env.REACT_APP_BASE_URL_PROD ||
        '',
    headers: {
        'Content-type': 'application/json',
    },
});
