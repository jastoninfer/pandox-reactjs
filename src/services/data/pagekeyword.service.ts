import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { _MessageResData } from 'types/services';
import type { PageKeywordResData } from 'types/pagekeyword';

type PageKeywordResponse = AxiosResponse<PageKeywordResData>;
type PageKeywordsResponse = AxiosResponse<PageKeywordResData[]>;

const BASE_URL = '/api/db/pagekeyword';

const getKeywordsByPageId = (pageId:number):Promise<PageKeywordResData[]> => {
    // 可选校验身份
    return http.get(`${BASE_URL}/${pageId}`,  {headers: authHeader()}).then((res:PageKeywordsResponse) => {
        return res.data;
    });
};

const createKeyword = (pageId:number, keyword:string):Promise<PageKeywordResData> => {
    // keyword应该是纯文本, 包装成json后发送出去
    return http.post(
        `${BASE_URL}/${pageId}`,
        {keyword},
        {headers: authHeader()}
    ).then((res:PageKeywordResponse) => {
        return res.data;
    });
};

const deleteKeywordByPageId = (pageId:number, keyword:string):Promise<_MessageResData> => {
    return http.delete(
        `${BASE_URL}/${pageId}/${keyword}`,
        {headers: authHeader()}
    ).then((res:AxiosResponse<_MessageResData>) => {
        return res.data;
    });
};

export default {
    getKeywordsByPageId,
    createKeyword,
    deleteKeywordByPageId,
};