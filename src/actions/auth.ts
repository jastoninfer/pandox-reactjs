import ActionTypes from "./types";
import AuthService from "../services/auth.service";
import { UserSerivce } from "../services/data";
import type {
  AF_register_failed,
  AF_register,
  AF_updateProfile,
  AF_login,
  AF_logout,
} from "types/actions";
import type { User, User_w_Token } from "types/user";
import type { RegisterResData } from "types/services";

export const register_failed: AF_register_failed = (message) => (dispatch) => {
  dispatch({
    type: ActionTypes.REGISTER_FAIL,
  });
  dispatch({
    type: ActionTypes.SET_MESSAGE,
    payload: { message },
  });
  return Promise.reject();
};

export const register: AF_register = (userRegister) => (dispatch) => {
  return AuthService.register(userRegister)
    .then((data: RegisterResData) => {
      dispatch({
        type: ActionTypes.REGISTER_SUCCESS,
      });
      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: { message: data.message },
      });
      return Promise.resolve();
    })
    .catch((err) => {
      const message: string = ((err.response &&
        err.response.data &&
        err.response.data.message) ||
        err.message ||
        err.toString()) as string;
      dispatch({
        type: ActionTypes.REGISTER_FAIL,
      });
      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: { message },
      });
      return Promise.reject();
    });
};

export const updateProfile: AF_updateProfile = (newProfile) => (dispatch) => {
  return UserSerivce.updateProfile(newProfile)
    .then((data: User) => {
      const old_data = JSON.parse(localStorage.getItem("user") || "");
      localStorage.setItem("user", JSON.stringify({ ...old_data, ...data }));
      dispatch({
        type: ActionTypes.UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const login: AF_login = (userLogin) => (dispatch) => {
  return AuthService.login(userLogin)
    .then((data: User_w_Token) => {
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: data,
      });
      return Promise.resolve();
    })
    .catch((err) => {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
      });
      dispatch({
        type: ActionTypes.SET_MESSAGE,
        payload: { message },
      });
      return Promise.reject();
    });
};

export const logout: AF_logout = () => (dispatch) => {
  return AuthService.logout()
    .then(() => {})
    .finally(() => {
      localStorage.removeItem("user");
      dispatch({
        type: ActionTypes.LOGOUT,
      });
      return Promise.resolve();
    });
};
