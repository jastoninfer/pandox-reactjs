import ActionTypes from 'actions/types';

import type {
    A_RegisterSuccess,
    A_RegisterFail,
    A_LoginSuccess,
    A_LoginFail,
    A_Logout,
    A_UpdateProfileSuccess,
} from 'types/actions';
import type { AuthState } from 'types/states';

var user: AuthState['user'] = null;

try {
    const userStr: string | null = localStorage.getItem('user');
    if (userStr) {
        user = JSON.parse(userStr);
    }
} catch (err) {}

const initState: AuthState = user
    ? { isLoggedin: true, user }
    : { isLoggedin: false, user: null };

export default (
    state: AuthState = initState,
    action:
        | A_RegisterSuccess
        | A_RegisterFail
        | A_LoginSuccess
        | A_LoginFail
        | A_Logout
        | A_UpdateProfileSuccess
) => {
    switch (action.type) {
        case ActionTypes.REGISTER_SUCCESS:
            return { ...state, isLoggedin: false };
        case ActionTypes.REGISTER_FAIL:
            return { ...state, isLoggedin: false };
        case ActionTypes.LOGIN_SUCCESS:
            return { ...state, isLoggedin: true, user: action.payload };
        case ActionTypes.LOGIN_FAIL:
            return { ...state, isLoggedin: false, user: null };
        case ActionTypes.LOGOUT:
            return { ...state, isLoggedin: false, user: null };
        case ActionTypes.UPDATE_PROFILE_SUCCESS:
            return { ...state, user: { ...state.user, ...action.payload } };
        default:
            return state;
    }
};
