import { AxiosResponse } from 'axios';
import http from '../http-common';

import type { UserRegister, UserLogin, User_w_Token } from 'types/user';
import type {
    RegisterResData,
    LogoutResData,
    LoginResData,
} from 'types/services';

type RegisterResponse = AxiosResponse<RegisterResData>;
type LoginResponse = AxiosResponse<LoginResData>;
type LogoutResponse = AxiosResponse<LogoutResData>;

const BASE_URL = '/api/access/auth/';

const register = (userRegister: UserRegister): Promise<RegisterResData> => {
    // username, email, password应该要挂载到req.body上
    return http
        .post(`${BASE_URL}signup`, userRegister)
        .then((res: RegisterResponse) => {
            return res.data;
        });
};

const login = (userLogin: UserLogin): Promise<User_w_Token> => {
    return http
        .post(`${BASE_URL}signin`, userLogin)
        .then((res: LoginResponse) => {
            // 返回JSON: {username, email, accessToken}
            // 遇到错误会有错误码以及 error.response.data.message或error.message
            // (在CATCH中解析)
            if (res.data.accessToken) {
                // localStorage.setItem('user', JSON.stringify(res.data));
            }
            return res.data;
        });
};

const logout = (): Promise<LogoutResData> => {
    return http.post(`${BASE_URL}logout`).then((res: LogoutResponse) => {
        return res.data;
    });
};

export default {
    register,
    login,
    logout,
};
