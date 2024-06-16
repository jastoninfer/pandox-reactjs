import http from '../../http-common';

const BASE_URL = '/api/db/es/';

const searchUser = async (keyword, userIdx=1) => {
    // const timestamp = Date.now();
    // const data = await http.get(`${BASE_URL}users/${keyword}/${userIdx}`);
    // return {
    //     timestamp,
    //     data
    // };
    return http.get(`${BASE_URL}users/${keyword}/${userIdx}`);
};

const searchPage = async (keyword, pageIdx=1) => {
    // const timestamp = Date.now();
    // const data = await http.get(`${BASE_URL}pages/${keyword}/${pageIdx}`);
    // return {
    //     timestamp,
    //     data
    // };
    return http.get(`${BASE_URL}pages/${keyword}/${pageIdx}`);
};

export default {
    searchPage,
    searchUser,
};