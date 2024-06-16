import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/';

const createThread = (pageId, threadData) => {
    return http.post(
        `${BASE_URL}threads/${pageId}`,
        threadData,
        {headers: authHeader()}
    );
};

const getThreadsByPageId = (pageId, threadIdx=1) => {
    return http.get(
        `${BASE_URL}threads/${pageId}?threadIdx=${threadIdx}`,
    );
};

const deleteThreadById = (threadId) => {
    return http.delete(
        `${BASE_URL}threads/${threadId}`,
        {headers: authHeader()}
    );
};

export default {
    createThread,
    getThreadsByPageId,
    deleteThreadById,
};