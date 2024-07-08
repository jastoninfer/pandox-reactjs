import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { PageResData, CreatePage, UpdatePage, PageRecommendResData, PaginatedPagesResData } from 'types/page';
import type { _MessageResData } from 'types/services';
const BASE_URL = '/api/db/';

type PageResponse = AxiosResponse<PageResData>;
type PaginatedPagesResponse = AxiosResponse<PaginatedPagesResData>;
type PagesRecommendResponse = AxiosResponse<PageRecommendResData[]>;

const getPageById = (pageId:number):Promise<PageResData> => {
    // 可选校验身份
    return http.get(`${BASE_URL}pages/${pageId}`,  {headers: authHeader()}).then((res:PageResponse) => {
        return res.data;
    });
};

const createPage = (pageData:CreatePage):Promise<PageResData> => {
    return http.post(
        `${BASE_URL}pages`,
        pageData,
        {headers: authHeader()}
    ).then((res:PageResponse) => {
        return res.data;
    });
};

const getRecommendedPages = ():Promise<PageRecommendResData[]> => {
    // 可以校验也可以不校验身份
    // 同时获取对应的page的用户的头像
    return http.get(`${BASE_URL}pagerecommend`,  {headers: authHeader()}).then((res:PagesRecommendResponse) => {
        return res.data;
    });
};

const getPagesByOwner = (pageOwner:string, pageIdx:number=1):Promise<PaginatedPagesResData> => {
    return http.get(`${BASE_URL}pagelist?pageOwner=${pageOwner}&pageIdx=${pageIdx}`,
      {headers: authHeader()}).then((res:PaginatedPagesResponse) => {
        return res.data;
      })
};

const updatePageById = (pageId:number, newPageData:UpdatePage):Promise<_MessageResData> => {
    return http.put(
        `${BASE_URL}pages/${pageId}`,
        newPageData,
        {headers: authHeader()}
    ).then((res:AxiosResponse<_MessageResData>) => {
        return res.data;
    });
};

const deletePageById = (pageId:number):Promise<_MessageResData> => {
    return http.delete(
        `${BASE_URL}pages/${pageId}`,
        {headers: authHeader()}
    ).then((res:AxiosResponse<_MessageResData>) => {
        return res.data;
    });
};

export default {
    getPageById,
    createPage,
    getRecommendedPages,
    getPagesByOwner,
    updatePageById,
    deletePageById,
};