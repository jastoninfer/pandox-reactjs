
import { useEffect, useState } from 'react';
import * as S from './style';
import { NavLink, Outlet, useLocation, useNavigation, useParams } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { SearchEService } from '../../services/data';
import { UserSerivce } from '../../services/data';
import { marked, Marked } from 'marked';
import { PaginationNavBar } from '../PageMain/PageCommentMain/PageCommentMain';
// const markedPlaintify = require('marked-plaintify');
import markedPlaintify from 'marked-plaintify';
import searchEsService from '../../services/data/search.es.service';

// const useQuery = () => {
//     return new URLSearchParams(useLocation().search);
// };
const filterImagesFromPage = async (pageContent, maxNum=3) => {
    const _tokens = marked.lexer(pageContent);
    const _images = [];
    const _walkImageTokens = async (_token_list) => {
        if (_images.length >= maxNum) {
            return;
        }
        for (const _token of _token_list) {
            if (_token['type'] === 'image' && _images.length < maxNum) {
                _images.push(_token['href']);
            } else if (_token.tokens) {
                await _walkImageTokens(_token.tokens);
            }
        }
    };
    await _walkImageTokens(_tokens);
    return _images;
};

const SearchPageItem = ({source}) => {
    // console.log(source);
    // {title, content, type}
    // console.log(source);
    const navigate = useNavigate();
    const handleUsernameOnClick = (e) => {
        e.preventDefault();
        navigate(`/users/@${source.author}`);
    };

    const handlePagetitleOnClick = (e) => {
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

export const SearchPages = ({parentMatch}) => {
    const {searchTerm} = useParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();

    const [pages, setPages] = useState(null);
    const parser = new Marked({ gfm: true }).use(markedPlaintify());

    const getPages = async (idx=1) => {
        try {
            const res = await SearchEService.searchPage(searchTerm, idx);
            // console.log(res);
            for(const item of res?.data.results) {
                try {
                    const user = await UserSerivce.viewProfile(item._source.author);
                    // console.log('user is ...', user);
                    item._source.avatar = user?.data.avatar;
                    item._source.images = await filterImagesFromPage(item._source.content, 1);
                    item._source.content = parser.parse(item._source.content);
                } catch (err) {
                    console.log(err.message || 'Error occurred');
                }
            }
            setPages(res.data);
        // current, total, results: [_source: {title, author, content, type, id}]
        } catch (err) {
            console.log(err.message || 'Error occurred');
        }
    };

    const getPagesAndScroll = async (idx=1) => {
        await getPages(idx);
        window.scrollTo({behavior: 'smooth', top: document.querySelector('.search-container').getBoundingClientRect().top + window.scrollY-100});
    }

    useEffect(() => {
        // 挂载时执行检索操作(可能)
        // console.log('here--->');
        if(parentMatch === '') {
            // console.log('redirecting.....');
            navigate(pathname + '/pages');
            // 强制刷新页面
            getPages();
            // window.location.reload();
            return;
        }
        getPages();
        // 拉取内容, 通过底部navbar进行操作
    }, []);

    return (
        <div className='search-pages-container'>
            {/* {`Pages ${searchTerm} MATCH: ${parentMatch}`} */}
            {pages?.results.map((pageItem, index) => (
            <SearchPageItem key={index} source={pageItem._source}/>))}
            {pages?.total > 1 && (
            <PaginationNavBar items={pages} getItemsByIdx={getPagesAndScroll}/>)}
        </div>
    );
};

const SearchUserItem = ({source}) => {

    return (
        <div className='search-useritem-container'>
            <div className='search-useritem-avatar-container'>
                <img src={source.avatar}></img>
            </div>
            <div className='search-useritem-desc-container'>
                <span className='search-useritem-username'>
                    {source.username}
                </span>
                <span className='search-useritem-selfintro'>
                    {source.selfIntro}
                </span>
            </div>
        </div>
    );
};

export const SearchUsers = () => {
    const {searchTerm} = useParams();
    const [users, setUsers] = useState(null);

    const getUsers = async (idx=1) => {
        try {
            const res = await searchEsService.searchUser(searchTerm, idx);
            // console.log(res);
            // setUsers(res.data);
            // current, total, results: [_type, _source: {avatar, username}]
            // console.log(users);
            for (const item of res?.data.results) {
                try {
                    const user = await UserSerivce.viewProfile(item._source.username);
                    item._source.avatar = user?.data.avatar;
                    item._source.selfIntro = user?.data.selfIntro;
                    // console.log(item);
                    // console.log(user);
                } catch (err) {
                    console.log(err.message || 'Error occurred.');
                }
            }
            setUsers(res.data);
            // console.log(res.data);
        } catch (err) {
            console.log(err.message || 'Error occurred.');
        }
    };

    const getUsersAndScroll = async (idx=1) => {
        await getUsers(idx);
        window.scrollTo({behavior: 'smooth', top: document.querySelector('.search-container').getBoundingClientRect().top + window.scrollY-100});
    }

    useEffect(() => {
        
        // 挂载时执行检索操作(可能)
        // 拉取内容, 通过底部navbar进行操作
        getUsers();
    }, []);
    return (
        <div className='search-users-container'>
            {users?.results.map((userItem, index) => (
                <SearchUserItem key={index} source={userItem._source}/>
            ))}
            {users?.total > 1 && (
            <PaginationNavBar items={users} getItemsByIdx={getUsersAndScroll}/>)}
        </div>
    );
};

const Search = () => {
    // const query = useQuery();
    // const searchTerm = query.get('q');
    const {searchTerm} = useParams();
    // 前端控制searchTerm的长度不能为空或者长度不能超过给定的限制
    const minSearchLength = 2;
    const maxSearchLength = 30;

    const [error, setError] = useState('');

    useEffect(() => {
        // 挂载时执行检索操作(可能)
        if(searchTerm.length < minSearchLength) {
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