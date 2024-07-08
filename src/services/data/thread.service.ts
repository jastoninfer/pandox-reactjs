import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { CreateThread, ThreadResData, PaginatedThreadsResData } from 'types/thread';
import type { _MessageResData } from 'types/services';
const BASE_URL = '/api/db/';

const createThread = (pageId:number, threadData:CreateThread):Promise<ThreadResData> => {
    return http.post(
        `${BASE_URL}threads/${pageId}`,
        threadData,
        {headers: authHeader()}
    ).then((res: AxiosResponse<ThreadResData>) => {
        return res.data;
    });
};

const getThreadsByPageId = (pageId:number, threadIdx:number=1):Promise<PaginatedThreadsResData> => {
    return http.get(
        `${BASE_URL}threads/${pageId}?threadIdx=${threadIdx}`,
    ).then((res: AxiosResponse<PaginatedThreadsResData>) => {
        return res.data;
    });
};

const deleteThreadById = (threadId:number):Promise<_MessageResData> => {
    return http.delete(
        `${BASE_URL}threads/${threadId}`,
        {headers: authHeader()}
    ).then((res:AxiosResponse<_MessageResData>) => {
        return res.data;
    });
};

export default {
    createThread,
    getThreadsByPageId,
    deleteThreadById,
};