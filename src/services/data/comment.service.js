import http from '../../http-common';
import { authHeader } from '../serviceHelper';

const BASE_URL = '/api/db/';

const createComment = (threadId, commentData) => {
    return http.post(
        `${BASE_URL}comments/${threadId}`,
        commentData,
        {headers: authHeader()}
    );
};

const getCommentsByThreadId = (threadId, commentIdx=1) => {
    return http.get(
        `${BASE_URL}comments/${threadId}?commentIdx=${commentIdx}`,
    );
};

const deleteCommentById = (commentId) => {
    return http.delete(
        `${BASE_URL}comments/${commentId}`,
        {headers: authHeader()}
    );
};

export default {
    createComment,
    getCommentsByThreadId,
    deleteCommentById,
};