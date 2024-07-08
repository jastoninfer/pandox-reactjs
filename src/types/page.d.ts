import React from 'react';

import { PageStatus } from 'enums/page.enum';
import type { _TimeStampResData } from './services';
import type { _PaginationResData } from './services';

export type _Page = {
    id: number;
    author: string;
    title: string;
    description: string | null;
    content: string;
    status: PageStatus;
};

export type CreatePage = Omit<
    _Page,
    'id' | 'author' | 'description' | 'status'
> &
    Partial<Pick<_Page, 'description' | 'status'>>;

export type UpdatePage = CreatePage;

export interface PageResData extends _Page, _TimeStampResData {
    avatar: string;
}

export interface PageRecommendResData extends PageResData {
    imageUrls: string[];
}

export interface SinglePaginatedPage extends _Page, _TimeStampResData {}

export interface PaginatedPagesResData extends _PaginationResData {
    pages: SinglePaginatedPage[];
}

export interface PageMainCommentForwardRef {
    handleCommentOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface SingleProfileBlogData extends SinglePaginatedPage {
    avatar?: string;
    images?: string[];
}

export interface ProfileBlogsData extends PaginatedPagesResData {
    pages: SingleProfileBlogData[];
}
