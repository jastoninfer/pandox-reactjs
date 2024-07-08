// import {
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT,
//     UPDATE_PROFILE_SUCCESS
// } from '../actions/types';

import ActionTypes from "actions/types";

import type { User_w_Token } from "types/user";
import type { A_RegisterSuccess, A_RegisterFail, A_LoginSuccess, A_LoginFail, A_Logout, A_UpdateProfileSuccess } from "types/actions";
import type { AuthState } from "types/states";

// type AuthState = {
//     user: User_w_Token|null,
//     isLoggedin: boolean
// };

var user:AuthState['user'] = null;

try {
    const userStr:string|null = localStorage.getItem('user');
    if(userStr) {
        user = (JSON.parse(userStr));
    }
    // user = JSON.parse(localStorage.getItem('user')||'') as User_w_Token;
} catch(err) {
    
}

// var user1 =  JSON.parse(localStorage.getItem('user'));
const initState:AuthState = user ? { isLoggedin : true, user } :
        { isLoggedin: false, user: null };

export default (state:AuthState=initState, action:A_RegisterSuccess|A_RegisterFail|A_LoginSuccess|A_LoginFail|A_Logout|A_UpdateProfileSuccess) => {
    // const {type, payload} = action;
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return {...state, isLoggedin: false};
        case ActionTypes.REGISTER_FAIL:
            return {...state, isLoggedin: false};
        case ActionTypes.LOGIN_SUCCESS:
            return {...state, isLoggedin: true, user: action.payload};
        case ActionTypes.LOGIN_FAIL:
            return {...state, isLoggedin: false, user: null};
        case ActionTypes.LOGOUT:
            return {...state, isLoggedin: false, user: null};
        case ActionTypes.UPDATE_PROFILE_SUCCESS:
            return {...state, user: {...state.user, ...action.payload}};
        default:
            return state;
    }
};