import { AxiosResponse } from "axios";

import type { User_w_Token } from "./user";

export interface _MessageResData {
    message: string;
}

export interface _FilenameResData {
    filename: string;
}

export interface _TimeStampResData {
    createdAt: string;
    updatedAt: string;
}

export interface _AvatarResData {
    avatar: string;
}

export interface _PaginationResData {
    current: number;
    total: number;
}

export interface RegisterResData extends _MessageResData {}
export interface LogoutResData extends _MessageResData {}
export interface LoginResData extends User_w_Token {}