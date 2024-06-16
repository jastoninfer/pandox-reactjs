import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PROFILE_SUCCESS
} from '../actions/types';

var user = null;
try {
    user = JSON.parse(localStorage.getItem('user'));
} catch(err) {
    
}
// var user1 =  JSON.parse(localStorage.getItem('user'));
const initState = user ? { isLoggedin : true, user } :
        { isLoggedin: false, user: null };

export default (state=initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            return {...state, isLoggedin: false};
        case REGISTER_FAIL:
            return {...state, isLoggedin: false};
        case LOGIN_SUCCESS:
            return {...state, isLoggedin: true, user: payload.user};
        case LOGIN_FAIL:
            return {...state, isLoggedin: false, user: null};
        case LOGOUT:
            return {...state, isLoggedin: false, user: null};
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user: {...state.user, ...payload}};
        default:
            return state;
    }
};