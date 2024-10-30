import type { _TimeStampResData } from './services';
import type { _PaginationResData } from './services';
import type { _AvatarResData } from './services';

type _Thread = {
    id: number;
    author: string;
    text: string;
    pageId: number;
};

export type CreateThread = Omit<_Thread, 'id' | 'author' | 'pageId'>;

export interface ThreadResData extends _Thread, _TimeStampResData {}

interface SinglePaginatedThread extends ThreadResData, _AvatarResData {}

export interface PaginatedThreadsResData extends _PaginationResData {
    threads: SinglePaginatedThread[];
}
