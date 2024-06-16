import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/pagekeyword';

const getKeywordsByPageId = (pageId) => {
    // 可选校验身份
    return http.get(`${BASE_URL}/${pageId}`,  {headers: authHeader()});
};

const createKeyword = (pageId, keyword) => {
    // keyword应该是纯文本, 包装成json后发送出去
    return http.put(
        `${BASE_URL}/${pageId}`,
        {keyword},
        {headers: authHeader()}
    );
};

const deleteKeywordByPageId = (pageId, keyword) => {
    return http.delete(
        `${BASE_URL}/${pageId}`,
        {keyword},
        {headers: authHeader()}
    );
};

export default {
    getKeywordsByPageId,
    createKeyword,
    deleteKeywordByPageId,
};