
import React, { useEffect, useState } from 'react';
import {useNavigate, NavLink, NavigateFunction, Outlet, useLocation, useParams } from 'react-router-dom';
import { marked, Marked, Token, TokensList } from 'marked';
import markedPlaintify from 'marked-plaintify';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { SearchEService } from '../../services/data';
import { UserSerivce } from '../../services/data';
import { PaginationNavBar } from '../PageMain/PageCommentMain/PageCommentMain';
import searchEsService from '../../services/data/search.es.service';

import { SEARCH_LEN_LIMIT } from 'constants/search.constant';
import type { PaginatedESPagesResData, PaginatedESUsersResData, SinglePaginatedESPage, SinglePaginatedESUser } from 'types/search.es';
import type { User } from 'types/user';

import * as S from './style';


const filterImagesFromPage = async (pageContent: string, maxNum: number = 3): Promise<string[]> => {
    const _tokens: TokensList = marked.lexer(pageContent);
    const _images: string[] = [];
    const _walkImageTokens = async (_token_list: TokensList|Token[]): Promise<void> => {
        if (_images.length >= maxNum) {
            return;
        }
        for (const _token of _token_list) {
            if (_token['type'] === 'image' && _images.length < maxNum) {
                _images.push(_token['href']);
            } else if ('tokens' in _token) {
                await _walkImageTokens(_token.tokens||[]);
            }
        }
    };
    await _walkImageTokens(_tokens);
    return _images;
};

interface SearchPageItemProps {
    pageItem: SinglePaginatedESPage;
}

const SearchPageItem:React.FC<SearchPageItemProps> = ({pageItem}) => {
    const navigate:NavigateFunction = useNavigate();
    const source = pageItem._source;
    const handleUsernameOnClick = (e:React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/users/@${source.author}`);
    };

    const handlePagetitleOnClick = (e:React.MouseEvent) => {
        e.preventDefault();
        navigate(`/pages/@${source.author}/${source.id}`);
    };

    return (
        <div className='search-pageitem-container'>
            <div className='search-pageitem-left-container'>
                <div className='page-item-author-container'
                    onClick={handleUsernameOnClick}>
                    <div className='page-item-avatar-container'>
                        <img src={source.avatar}></img>
                    </div>
                    <span>{`@${source.author}`}</span>
                </div>
                <a className='page-item-title' onClick={handlePagetitleOnClick}>{source.title}</a>
                <div className='page-item-content' onClick={handlePagetitleOnClick}>{source.content.slice(0,500)}</div>
            </div>
            {
                source.images.length>0 && (<div className='search-pageitem-right-container'>
                    <img src={source.images[0]}></img>
                </div>)
            }
        </div>
    );
};

interface SearchPagesProps {
    parentMatch?: string;
}

export const SearchPages:React.FC<SearchPagesProps> = ({parentMatch}) => {
    const {searchTerm} = useParams();
    const pathname:string = useLocation().pathname;
    const navigate:NavigateFunction = useNavigate();

    const [pages, setPages] = useState<PaginatedESPagesResData|null>(null);
    const parser:Marked = new Marked({ gfm: true }).use(markedPlaintify());

    const getPages = async (idx:number=1) => {
        try {
            if(!searchTerm) {
                return;
            }
            const pagesData:PaginatedESPagesResData = await SearchEService.searchPage(searchTerm, idx);
            for(const item of pagesData.results) {
                try {
                    const user:User = await UserSerivce.viewProfile(item._source.author);
                    item._source.avatar = user.avatar;
                    item._source.images = await filterImagesFromPage(item._source.content, 1);
                    item._source.content = parser.parse(item._source.content) as string;
                } catch (err:any) {
                    console.log(err.message || 'Error occurred');
                }
            }
            setPages(pagesData);
        } catch (err:any) {
            console.log(err.message || 'Error occurred');
        }
    };

    const getPagesAndScroll = async (idx:number=1) => {
        await getPages(idx);
        const searchContainer:HTMLElement|null = document.querySelector('.search-container');
        if(searchContainer) {
            window.scrollTo({behavior: 'smooth', top: searchContainer.getBoundingClientRect().top + window.scrollY-100});
        }
    }

    useEffect(() => {
        // 挂载时执行检索操作(可能)
        if(parentMatch === '') {
            navigate(pathname + '/pages');
            // 强制刷新页面
            getPages();
            return;
        }
        getPages();
        // 拉取内容, 通过底部navbar进行操作
    }, []);

    return (
        <div className='search-pages-container'>
            {pages && pages.results.map((pageItem, index) => (
            <SearchPageItem key={index} pageItem={pageItem}/>))}
            {pages && pages.total > 1 && (
            <PaginationNavBar items={pages} getItemsByIdx={getPagesAndScroll}/>)}
        </div>
    );
};

interface SearchUserItemProps {
    userItem: SinglePaginatedESUser;
}

const SearchUserItem:React.FC<SearchUserItemProps> = ({userItem}) => {

    return (
        <div className='search-useritem-container'>
            <div className='search-useritem-avatar-container'>
                <img src={userItem._source.avatar}></img>
            </div>
            <div className='search-useritem-desc-container'>
                <span className='search-useritem-username'>
                    {userItem._source.username}
                </span>
                <span className='search-useritem-selfintro'>
                    {userItem._source.selfIntro}
                </span>
            </div>
        </div>
    );
};

export const SearchUsers = () => {
    const {searchTerm} = useParams();
    const [users, setUsers] = useState<PaginatedESUsersResData|null>(null);

    const getUsers = async (idx:number=1) => {
        try {
            if(!searchTerm) {
                return;
            }
            const usersData:PaginatedESUsersResData = await searchEsService.searchUser(searchTerm, idx);
            for (const item of usersData.results) {
                try {
                    const user:User = await UserSerivce.viewProfile(item._source.username);
                    item._source.avatar = user.avatar;
                    item._source.selfIntro = user.selfIntro;
                } catch (err:any) {
                    console.log(err.message || 'Error occurred.');
                }
            }
            setUsers(usersData);
        } catch (err:any) {
            console.log(err.message || 'Error occurred.');
        }
    };

    const getUsersAndScroll = async (idx=1) => {
        await getUsers(idx);
        const searchContainer:HTMLElement|null = document.querySelector('.search-container');
        if(searchContainer) {
            window.scrollTo({behavior: 'smooth', top: searchContainer.getBoundingClientRect().top + window.scrollY-100});
        }
    }

    useEffect(() => {
        // 挂载时执行检索操作(可能)
        // 拉取内容, 通过底部navbar进行操作
        getUsers();
    }, []);
    return (
        <div className='search-users-container'>
            {users && users.results.map((userItem, index) => (
                <SearchUserItem key={index} userItem={userItem}/>
            ))}
            {users && users.total > 1 && (
            <PaginationNavBar items={users} getItemsByIdx={getUsersAndScroll}/>)}
        </div>
    );
};

const Search = () => {
    const {searchTerm} = useParams();
    // 前端控制searchTerm的长度不能为空或者长度不能超过给定的限制
    const minSearchLength:number = SEARCH_LEN_LIMIT.MIN;
    const maxSearchLength:number = SEARCH_LEN_LIMIT.MAX;

    const [error, setError] = useState<string>('');

    useEffect(() => {
        // 挂载时执行检索操作(可能)
        if(!searchTerm || searchTerm.length < minSearchLength) {
            setError('Search term should not be shorter than 2.');
            return;
        }else if(searchTerm.length > maxSearchLength) {
            setError('Search term length should not exceed 30.');
            return;
        }
    }, []);

    return (
        <div>
            <NavBar displaytype='secondary'/>
            <S.SearchContainer>
                {error && (<div className='search-error-container'>
                    <h1>
                        {error}
                    </h1>
                </div>)}
                {!error &&
                (<div className='search-container'>
                    <div className='search-header-container'>
                        <h1>Search Results for</h1>
                        <h1 className='search-term'>{searchTerm}</h1>
                    </div>
                    <div className='search-navbar-container'>
                        <NavLink to='pages'>Pages</NavLink>
                        <NavLink to='users'>Users</NavLink>
                    </div>
                    <Outlet/>
                </div>)}
            </S.SearchContainer>
            <Footer/>
        </div>
    );
}

export default Search;