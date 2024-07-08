import { Dispatch, Action } from 'redux';

import ActionTypes from 'actions/types';
import type {
    User_w_Token,
    UserCustomProfile,
    UserRegister,
    UserLogin,
} from './user';

interface A_Base<T extends ActionTypes> extends Action<T> {}

interface P_Message {
    message: string;
}
interface P_UpdateProfile extends UserCustomProfile {}
interface P_Login extends User_w_Token {}

export type A_Any = A_Base<ActionTypes>;

type A_RegisterFail = A_Base<ActionTypes.REGISTER_FAIL>;
type A_RegisterSuccess = A_Base<ActionTypes.REGISTER_SUCCESS>;
export type A_SetMessage = A_Base<ActionTypes.SET_MESSAGE> & {
    payload: P_Message;
};
export type A_ClearMessage = A_Base<ActionTypes.CLEAR_MESSAGE>;
type A_UpdateProfileSuccess = A_Base<ActionTypes.UPDATE_PROFILE_SUCCESS> & {
    payload: P_UpdateProfile;
};
export type A_LoginSuccess = A_Base<ActionTypes.LOGIN_SUCCESS> & {
    payload: P_Login;
};
type A_LoginFail = A_Base<ActionTypes.LOGIN_FAIL>;
type A_Logout = A_Base<ActionTypes.LOGOUT>;
// const x = new myAction();

type Actions = Action<ActionTypes>;

type AF<T, R extends void | Promise<void> = Promise<void>> = (
    dispatch: Dispatch<T | A_SetMessage>
) => R;

export type AF_register_failed = (message: string) => AF<A_RegisterFail>;

export type AF_register = (
    userRegister: UserRegister
) => AF<A_RegisterFail | A_RegisterSuccess>;

export type AF_updateProfile = (
    newProfile: UserCustomProfile
) => AF<A_UpdateProfileSuccess>;

export type AF_login = (
    userLogin: UserLogin
) => AF<A_LoginSuccess | A_LoginFail>;

export type AF_logout = () => AF<A_Logout>;
