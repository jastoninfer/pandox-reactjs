import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/';

const getPageById = (pageId) => {
    // 可选校验身份
    return http.get(`${BASE_URL}pages/${pageId}`,  {headers: authHeader()});
};

const createPage = (pageData) => {
    return http.post(
        `${BASE_URL}pages`,
        pageData,
        {headers: authHeader()}
    );
};

const getRecommendedPages = () => {
    // 可以校验也可以不校验身份
    // 同时获取对应的page的用户的头像
    return http.get(`${BASE_URL}pagerecommend`,  {headers: authHeader()});
};

const getPagesByOwner = (pageOwner, pageIdx=1) => {
    return http.get(`${BASE_URL}pagelist?pageOwner=${pageOwner}&pageIdx=${pageIdx}`,
      {headers: authHeader()});
};

const updatePageById = (pageId, newPageData) => {
    return http.put(
        `${BASE_URL}pages/${pageId}`,
        newPageData,
        {headers: authHeader()}
    );
};

const deletePageById = (pageId) => {
    return http.delete(
        `${BASE_URL}pages/${pageId}`,
        {headers: authHeader()}
    );
};

export default {
    getPageById,
    createPage,
    getRecommendedPages,
    getPagesByOwner,
    updatePageById,
    deletePageById,
};