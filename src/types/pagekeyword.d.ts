import type { _TimeStampResData } from './services';

type _PageKeyword = {
    pageId: string;
    keyword: string;
};

export type CreatePageKeyword = _PageKeyword;

export interface PageKeywordResData extends _PageKeyword, _TimeStampResData {}
