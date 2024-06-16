import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    UPDATE_PROFILE_SUCCESS,
} from './types';

import AuthService from '../services/auth.service';
import { UserSerivce } from '../services/data';

export const register_failed = (message) => (dispatch) => {
    dispatch({
        type: REGISTER_FAIL,
    });
    dispatch({
        type: SET_MESSAGE,
        payload: {message},
    });
    return Promise.reject();
};

export const register = (username, email, password) => (dispatch) => {
    // console.log('password', password);
    return AuthService.register(username, email, password).then((res) => {
        // res.send({message: '....'})
        // 那么此处res.data的意义是什么??????, 只是message吗
        // console.log('ok');
        // console.log('res is ', res);
        dispatch({
            type: REGISTER_SUCCESS
        });
        // 注册成功不需要设置message?
        dispatch({
            type: SET_MESSAGE,
            payload: res.data,
        });
        // if(res.data)
        return Promise.resolve();
    }).catch((err) => {
        // console.log('bad');
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        // console.log(message);
        dispatch({
            type: REGISTER_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {message},
        });
        return Promise.reject();
    });
};

export const updateProfile = (newProfile) => (dispatch) => {
    return UserSerivce.updateProfile(newProfile).then((res) => {
        // console.log('on success');
        // console.log('res data is ');
        // console.log(res.data);
        const old_data = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({...old_data, ...res.data}));
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: res.data,
        });
    }).catch((err) => {
        console.log('on error');
        return Promise.reject(err);
    });
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then((data) => {
        // 已经被service处理过了, service拿到res返回res.data
        // 这里直接处理data
        // 登录成功, 不会再设置'登录成功'的message
        if(data.accessToken) {
            localStorage.setItem('user', JSON.stringify(data));
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
        });
        return Promise.resolve();
    }).catch((err) => {
        const message = (err.response && err.response.data && err.response.data.message)
            || err.message || err.toString();
        dispatch({
            type: LOGIN_FAIL,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {message},
        });
        return Promise.reject();
    });
};

export const logout = () => (dispatch) => {
    AuthService.logout().then(() => {
        // console.log('success');
        localStorage.removeItem('user');
        dispatch({
            type: LOGOUT,
        });
    });
};