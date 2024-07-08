import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { User, UserCustomProfile } from 'types/user';

const BASE_URL = '/api/db/';

const viewProfile = (username: string): Promise<User> => {
    return http
        .get(`${BASE_URL}users/${username}`, { headers: authHeader() })
        .then((res: AxiosResponse<User>) => {
            return res.data;
        });
};

const updateProfile = (newProfile: UserCustomProfile): Promise<User> => {
    return http
        .put(`${BASE_URL}users`, newProfile, { headers: authHeader() })
        .then((res: AxiosResponse<User>) => {
            return res.data;
        });
};

export default {
    viewProfile,
    updateProfile,
};
