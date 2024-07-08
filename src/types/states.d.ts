import type { User_w_Token } from "./user";

export type AuthState = {
    user: User_w_Token|null,
    isLoggedin: boolean
};

export type MessageState = {
    message: string,
};

export type _ReduxState = {
    auth: AuthState,
    message: MessageState,
};