import type { _PaginationResData } from './services';
import type { _Page } from './page';
import type { User } from './user';

interface SingleESItem {
    _index: string;
    _score: number;
    _type: string;
    _source: any;
}

interface SinglePaginatedESPage extends SingleESItem {
    _source: Omit<_Page, 'status'> &
        Partial<Pick<User, 'avatar'>> & {
            images: string[];
        };
}

interface SinglePaginatedESUser extends SingleESItem {
    _source: Omit<User, 'email' | 'selfIntro'> &
        Partial<Pick<User, 'selfIntro'>>;
}

export interface PaginatedESPagesResData extends _PaginationResData {
    results: SinglePaginatedESPage[];
}

export interface PaginatedESUsersResData extends _PaginationResData {
    results: SinglePaginatedESUser[];
}
