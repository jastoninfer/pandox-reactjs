import { AxiosResponse } from 'axios';
import http from '../../http-common';

import type {
    PaginatedESPagesResData,
    PaginatedESUsersResData,
} from 'types/search.es';

const BASE_URL = '/api/db/es/';

const searchUser = (
    keyword: string,
    userIdx: number = 1
): Promise<PaginatedESUsersResData> => {
    return http
        .get(`${BASE_URL}users/${keyword}/${userIdx}`)
        .then((res: AxiosResponse<PaginatedESUsersResData>) => {
            return res.data;
        });
};

const searchPage = (
    keyword: string,
    pageIdx: number = 1
): Promise<PaginatedESPagesResData> => {
    return http
        .get(`${BASE_URL}pages/${keyword}/${pageIdx}`)
        .then((res: AxiosResponse<PaginatedESPagesResData>) => {
            return res.data;
        });
};

export default {
    searchPage,
    searchUser,
};
