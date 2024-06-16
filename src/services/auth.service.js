import http from '../http-common';

const BASE_URL = '/api/access/auth/';

const register = (username, email, password) => {
    // username, email, password应该要挂载到req.body上
    // console.log('pwd is', password);
    return http.post(`${BASE_URL}signup`, {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return http.post(`${BASE_URL}signin`, {
        username,
        password,
    }).then((res) => {
        // 返回JSON: {username, email, accessToken}
        // 遇到错误会有错误码以及 error.response.data.message或error.message
        // (在CATCH中解析)
        if (res.data.accessToken) {
            // console.log('res is ===>>>');
            // console.log(res);
            // localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
    });
};

const logout = () => {
    return http.post(`${BASE_URL}logout`)
    .catch((err) => {
        // console.log("err logout");
    }).finally((res) => {
        // console.log('remove user here');
        // localStorage.removeItem('user');
    });
};

export default {
    register,
    login,
    logout,
};