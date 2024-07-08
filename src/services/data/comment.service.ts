import { AxiosResponse } from 'axios';
import http from '../../http-common';
import { authHeader } from '../serviceHelper';

import type { CreateComment, _Comment, CommentResData, PaginatedCommentsResData } from 'types/comment';

import type { _MessageResData } from 'types/services';

const BASE_URL = '/api/db/';

// interface CommentResData extends _Comment {}

type CommentResponse = AxiosResponse<CommentResData>;

type PaginatedCommentsResponse = AxiosResponse<PaginatedCommentsResData>;

const createComment = (threadId:number, commentData:CreateComment):Promise<CommentResData> => {
    return http.post(
        `${BASE_URL}comments/${threadId}`,
        commentData,
        {headers: authHeader()}
    ).then((res:CommentResponse) => {
        return res.data;
    });
};

const getCommentsByThreadId = (threadId:number, commentIdx:number=1):Promise<PaginatedCommentsResData> => {
    return http.get(
        `${BASE_URL}comments/${threadId}?commentIdx=${commentIdx}`,
    ).then((res: PaginatedCommentsResponse) => {
        return res.data;
    })
};

const deleteCommentById = (commentId:number):Promise<_MessageResData> => {
    return http.delete(
        `${BASE_URL}comments/${commentId}`,
        {headers: authHeader()}
    ).then((res: AxiosResponse<_MessageResData>) => {
        return res.data;
    });
};

export default {
    createComment,
    getCommentsByThreadId,
    deleteCommentById,
};