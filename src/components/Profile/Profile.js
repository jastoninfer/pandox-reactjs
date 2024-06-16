import NavBar from '../../components/NavBar';
import './index.css';
// import avatar from '../../static/user_icon.jpeg';
import { Link, NavLink, Outlet, useOutletContext, useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState, useRef, createContext, useContext } from 'react';
// import PageDataService from '../../services/page.service';
import { PageService } from '../../services/data';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserSerivce } from '../../services/data';
import Footer from '../Footer/Footer';
import * as S from './style';
import markedPlaintify from 'marked-plaintify';
import { marked, Marked } from 'marked';
import { PaginationNavBar } from '../PageMain/PageCommentMain/PageCommentMain';
import auth from '../../reducers/auth';

const ProfileContext = createContext(null);

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

export const ProfileAbout = ({parentMatch}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const {user, authUser} = useContext(ProfileContext);
    useEffect(() => {
        console.log('user is ', user);
        if(user && parentMatch === '') {
            navigate(location.pathname + '/about');
            return;
        }
    }, [user]);
    return (
        <p>{user?.selfIntro}</p>
    );
}

export const ProfileBlogs = () => {
    const {user, authUser} = useContext(ProfileContext);
    // const {username} = useParams();
    const parser = new Marked({ gfm: true }).use(markedPlaintify());
    const navigate = useNavigate();

    const [pages, setPages] = useState(undefined);
    const loading = useRef(false);
    // const [loading, setLoading] = useState(false);
    // const page = useRef(1);
    // const theEnd = useRef(false);
    const nextPage = useRef(null);
    // const skip = useRef(false);
    const getPages = async (idx=1) => {
        if(!user) {
            return Promise.reject('User undefined.');
        }
        try {
            const res = await PageService.getPagesByOwner(user?.username, idx);
            // console.log(res);
            // const res = await SearchEService.searchPage(searchTerm, idx);
            const userData = await UserSerivce.viewProfile(user?.username);
            // console.log('usr is', user);
            for (const item of res?.data.pages) {
                item.avatar = userData?.data.avatar;
                item.images = await filterImagesFromPage(item.content, 1);
                item.content = parser.parse(item.content);
            }
            // console.log(res);
            return res.data;
            // for(const item of res?.data.results) {
        } catch (err) {
            console.log(err.message + ' Error occurred');
        }
    };

    const getPagesAndScroll = async (idx=1) => {
        const pagesData = await getPages(idx);
        setPages(pagesData);
        window.scrollTo({behavior: 'smooth', top: document.querySelector('.profile-blogs-container').getBoundingClientRect().top + window.scrollY-100});
    }

    useEffect(() => {
        getPages().then((data) => {
            // console.log(data);
            setPages(data);
        }).catch((err) => {
            // console.log(err);
            console.log((err.message || err) + ' Error loading pages.');
        });
    }, [user]);

    const BlogSnippet = ({title, content}) => {
        return (
            <div className='BlogSnippetContainer'>
                <div className='BlogSnippetTitle'>
                    {title}
                </div>
                <div className='BlogSnippetContent'>
                    {content}
                </div>
            </div>
        );
    };

    // const fetchBlogs = async (onMount) => {
    //     console.log('---');
    //     // setLoading(true);
    //     loading.current = true;
    //     try {
    //         // console.log('loading ', loading);
    //         const newBlogs = (await PageDataService.getPagesByUserId('pandoxone', nextPage.current)).data;
    //         if(newBlogs.length > 0) {
    //             setBlogs((prevBlogs) => onMount ? [...newBlogs] : [...prevBlogs, ...newBlogs]);
    //             nextPage.current += 1;
    //             // setPage((prevPage) => prevPage + 1);
    //         } else {
    //             nextPage.current = 0;
    //             // theEnd.current = true;
    //         }
    //         // console.log('new blogs ', newBlogs);
    //         // console.log('list size ', newBlogs.length);
    //         // console.log('next page... ', nextPage.current);
    //     } catch (err) {
    //         // console.log('err==>', err);
    //         console.log('err while fetching blogs');
    //         // setLoading(false);
    //         // console.log('ladoing ', loading);
    //     }
    //     // setLoading(false);
    //     loading.current = false;
    // };

    // useEffect(() => {

    //     const handleScroll = () => {
    //         const buttom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    //         if(buttom) {
    //             console.log('reached...123');
    //             nextPage.current > 0 && !loading.current && fetchBlogs(false);
    //             // fetchBlogs(false);
    //         }
    //         // if(window.innerHeight + document.documentElement.scrollTop ===
    //         //     document.documentElement.offsetHeight) {
    //         //         console.log('reached....');
                    
    //         //     }
    //     };

    //     // let skip = false;
    //     nextPage.current = 1;
    //     fetchBlogs(true);
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         loading.current = false;
    //         nextPage.current = 1;
    //         window.removeEventListener('scroll', handleScroll);
    //         // skip = true;
    //         // console.log('unmount....');
    //         // console.log('blog size', blogs);
    //         // setBlogs((prevBlogs) => []);
    //         // setLoading(false);
    //     };
    // }, []);

    const handleBlogAuthorOnClick = (pageItem) => (e) => {
        e.preventDefault();
        navigate(`/users/@${pageItem?.author}`);
    };

    const handleBlogContentOnClick = (pageItem) => (e) => {
        e.preventDefault();
        // console.log('page item is..');
        // console.log(pageItem);
        navigate(`/pages/@${pageItem?.author}/${pageItem?.id}`);
    }

    return (
        <div className='profile-blogs-container'>
            {pages?.pages.map((pageItem, index) => (
                <div key={index} className='profile-blogitem-container'>
                    <div className='profile-blogitem-left-container'>
                        <div className='blogitem-author-container' onClick={handleBlogAuthorOnClick(pageItem)}>
                            <div className='blogitem-avatar-container'>
                                <img src={pageItem?.avatar}></img>
                            </div>
                            <span>{`@${pageItem.author}`}</span>
                        </div>
                        <div className='blogitem-title-container' onClick={handleBlogContentOnClick(pageItem)}>
                            {user?.username&&authUser?.username===user?.username&&(<span className={pageItem.status}>{pageItem.status}</span>)}
                            <a>{pageItem.title}</a>
                        </div>
                        {/* <div className='blogitem-content'>{
                            `$$ p(\mathbf{t,w}|\mathbf{x},\alpha,\sigma^2)=p(\mathbf{w}|\alpha)\prod_{n=1}^Np(t_n|\mathbf{w},x_n,\sigma^2), $$`
                        }</div> */}
                        {/* <div className='normaltext'>{`p(mathbf{t,w}|mathbf{x},alpha,sigma^2)=p(mathbf{w}|alpha)prod_{n=1}p(mathbf{t,w}|mathbf{x},alpha,sigma^2)=p(mathbf{w}|alpha)prod_{n=1}`}</div> */}
                        <div className='blogitem-content' onClick={handleBlogContentOnClick(pageItem)}>{
                            pageItem.content.slice(0,500)
                        }</div>
                    </div>
                    {
                        pageItem?.images.length > 0 && (
                        <div className='profile-blogitem-right-container'>
                            <img src={pageItem?.images[0]}></img>
                        </div>)
                    }
                </div>
            ))}
            {pages?.total > 1 && (
                <PaginationNavBar items={pages} getItemsByIdx={getPagesAndScroll}/>
            )}
        </div>
        // <div></div>
    );
}

const Profile = (props) => {
    // console.log(props);
    // const x = useOutletContext();
    // console.log(x);
    const avatar = useSelector(state => state.auth.user?.avatar);
    const authUser = useSelector(state => state.auth.user);
    // URL: /users/:username
    // avatar can be UNDEFINED
    const {username} = useParams();
    const [user, setUser] = useState(undefined);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getUserProfile = async () => {
        if (username.length < 2 || username.startsWith('@') === false) {
            return Promise.reject('Username should starts with @.');
        }
        try {
            const userData = await UserSerivce.viewProfile(username.slice(1));
            // console.log(userData);
            setUser(userData.data);
        } catch (err) {
            console.log(err.message || 'Error occurred.');
            return Promise.reject('User not found.');
        }
    };
    useEffect(() => {
        // console.log('awater is ...');
        // console.log(username);
        // 假设用户确实存在,  否则应该弹出错误信息(校验)
        getUserProfile().then(() => {
            // window.history.replaceState({}, '', `/users/@${user.username}`);
        }).catch((err) => {
            setError('User not found.');
            console.log(err.message || 'Error getting user profile.');
        })
        // 然后在此基础上, 刷新当前的url但不刷新页面
        // 使用window.history.replaceState
    }, []);

    const handleEditProfileOnClick = (e) => {
        e.preventDefault();
        navigate(`/me/settings/account`);
    }
    return (
        <ProfileContext.Provider value={{user, authUser}}>
        <div>
            <NavBar displaytype='secondary'></NavBar>
            <S.ProfileContainer>
                {error && (
                    <div className='profile-error-container'>
                        <h1>
                            {error}
                        </h1>
                    </div>
                )}
                {!error && (
                    <div className='profile-container'>
                        <div className='profile-left-container'>
                            <div className='profile-left-header'>
                                <div className='profile-left-header-avatar-container'>
                                    <img src={user?.avatar}></img>
                                </div>
                                <h1>
                                    {user?.username}
                                </h1>
                            </div>
                            <div className='profile-left-navbar-container'>
                                <NavLink to='./about'>About</NavLink>
                                <NavLink to='./blogs'>Blogs</NavLink>
                            </div>
                            <Outlet/>
                        </div>
                        <div className='profile-right-container'>
                            <div className='profile-right-avatar-container'>
                                <img src={user?.avatar}></img>
                            </div>
                            <span className='profile-right-username'>
                                {user?.username}
                            </span>
                            <a className='profile-right-edit-profile'
                                onClick={handleEditProfileOnClick}>
                                Edit profile
                            </a>
                        </div>
                    </div>
                )}
            </S.ProfileContainer>
            <Footer/>
        </div>
        </ProfileContext.Provider>
    );
}

export default Profile;