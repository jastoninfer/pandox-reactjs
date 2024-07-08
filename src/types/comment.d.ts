import type {
    _TimeStampResData,
    _PaginationResData,
    _AvatarResData,
} from './services';

export type _Comment = {
    id: number;
    threadId: number;
    from: string;
    to: string;
    text: string;
};

export type CreateComment = Omit<_Comment, 'id' | 'threadId' | 'from'>;

export interface CommentResData extends _Comment, _TimeStampResData {}

export interface SinglePaginatedComment
    extends CommentResData,
        _AvatarResData {}

export interface PaginatedCommentsResData extends _PaginationResData {
    comments: SinglePaginatedComment[];
}
