import markedPlaintify from 'marked-plaintify';
import { marked, Marked, TokensList } from 'marked';
import { useSelector } from 'react-redux';
import {
    NavLink,
    NavigateFunction,
    Outlet,
    useParams,
    useNavigate,
    useLocation,
} from 'react-router-dom';
import React, { useEffect, useState, createContext, useContext } from 'react';

import NavBar from '../../components/NavBar';
import { PageService, UserSerivce } from '../../services/data';
import Footer from '../Footer/Footer';
import { PaginationNavBar } from '../PageMain/PageCommentMain/PageCommentMain';

import { NavBarDisplayType } from 'enums/navbar.enum';
import type { _ReduxState } from 'types/states';
import type { User, User_w_Token } from 'types/user';
import type { _AvatarResData } from 'types/services';
import type {
    SingleProfileBlogData,
    ProfileBlogsData,
    PaginatedPagesResData,
} from 'types/page';

import * as S from './style';
import './index.css';

interface ProfileContextType {
    user: User | null;
    authUser: User_w_Token | null;
}

const ProfileContext = createContext<ProfileContextType>({
    user: null,
    authUser: null,
});

const filterImagesFromPage = async (
    pageContent: string,
    maxNum: number = 3
): Promise<string[]> => {
    const _tokens: TokensList = marked.lexer(pageContent);
    const _images: string[] = [];
    const _walkImageTokens = async (_token_list: TokensList) => {
        if (_images.length >= maxNum) {
            return;
        }
        for (const _token of _token_list) {
            if (_token['type'] === 'image' && _images.length < maxNum) {
                _images.push(_token['href']);
            } else if ('tokens' in _token) {
                await _walkImageTokens(_token.tokens as TokensList);
            }
        }
    };
    await _walkImageTokens(_tokens);
    return _images;
};

interface ProfileAboutProps {
    parentMatch?: String;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({ parentMatch }) => {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const { user, authUser } = useContext(ProfileContext);
    useEffect(() => {
        if (user && parentMatch === '') {
            navigate(location.pathname + '/about');
            return;
        }
    }, [user]);
    return <p>{user?.selfIntro}</p>;
};

export const ProfileBlogs = () => {
    const { user, authUser } = useContext(ProfileContext);
    const parser: Marked = new Marked({ gfm: true }).use(markedPlaintify());
    const navigate: NavigateFunction = useNavigate();

    const [pages, setPages] = useState<ProfileBlogsData | null>(null);
    const getPages = async (idx = 1): Promise<ProfileBlogsData | undefined> => {
        if (!user) {
            console.log('User undefined.');
            // return Promise.reject('User undefined.');
            return;
        }
        try {
            const pageData: PaginatedPagesResData =
                await PageService.getPagesByOwner(user.username, idx);
            const userData: User = await UserSerivce.viewProfile(user.username);
            const retData: ProfileBlogsData = {
                ...pageData,
                pages: [],
            };
            for (const item of pageData.pages) {
                const blogItem: SingleProfileBlogData = {
                    ...item,
                    avatar: userData.avatar,
                    images: await filterImagesFromPage(item.content, 1),
                    content: parser.parse(item.content) as string,
                };
                retData.pages.push(blogItem);
            }
            // console.log(retData);
            return retData;
        } catch (err: any) {
            console.log(err.message + ' Error occurred');
        }
    };

    const getPagesAndScroll = async (idx: number = 1) => {
        const pagesData: ProfileBlogsData | undefined = await getPages(idx);
        if (pagesData) {
            setPages(pagesData);
            const profileBlogsContainer: HTMLElement | null =
                document.querySelector('.profile-blogs-container');
            if (profileBlogsContainer) {
                window.scrollTo({
                    behavior: 'smooth',
                    top:
                        profileBlogsContainer.getBoundingClientRect().top +
                        window.scrollY -
                        100,
                });
            }
        }
    };

    useEffect(() => {
        getPages()
            .then((data) => {
                if (data) {
                    setPages(data);
                }
            })
            .catch((err) => {
                console.log((err.message || err) + ' Error loading pages.');
            });
    }, [user]);

    const handleBlogAuthorOnClick =
        (pageItem: SingleProfileBlogData) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            navigate(`/users/@${pageItem?.author}`);
        };

    const handleBlogContentOnClick =
        (pageItem: SingleProfileBlogData) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            navigate(`/pages/@${pageItem?.author}/${pageItem?.id}`);
        };

    return (
        <div className="profile-blogs-container">
            {pages?.pages.map((pageItem, index) => (
                <div key={index} className="profile-blogitem-container">
                    <div className="profile-blogitem-left-container">
                        <div
                            className="blogitem-author-container"
                            onClick={handleBlogAuthorOnClick(pageItem)}
                        >
                            <div className="blogitem-avatar-container">
                                <img src={pageItem?.avatar}></img>
                            </div>
                            <span>{`@${pageItem.author}`}</span>
                        </div>
                        <div
                            className="blogitem-title-container"
                            onClick={handleBlogContentOnClick(pageItem)}
                        >
                            {user?.username &&
                                authUser?.username === user?.username && (
                                    <span className={pageItem.status}>
                                        {pageItem.status}
                                    </span>
                                )}
                            <a>{pageItem.title}</a>
                        </div>
                        <div
                            className="blogitem-content"
                            onClick={handleBlogContentOnClick(pageItem)}
                        >
                            {pageItem.content.slice(0, 500)}
                        </div>
                    </div>
                    {pageItem?.images && pageItem?.images.length > 0 && (
                        <div className="profile-blogitem-right-container">
                            <img src={pageItem?.images[0]}></img>
                        </div>
                    )}
                </div>
            ))}
            {pages && pages.total > 1 && (
                <PaginationNavBar
                    items={pages}
                    getItemsByIdx={getPagesAndScroll}
                />
            )}
        </div>
    );
};

const Profile = () => {
    const avatar = useSelector<_ReduxState, string | undefined>(
        (state) => state.auth.user?.avatar
    );
    const authUser = useSelector<_ReduxState, User_w_Token | null>(
        (state) => state.auth.user
    );
    // URL: /users/:username
    // avatar can be UNDEFINED
    const { username } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string>('');
    const navigate: NavigateFunction = useNavigate();

    const getUserProfile = async () => {
        if (!username) {
            return Promise.reject('User not found.');
        }
        if (username.length < 2 || username.startsWith('@') === false) {
            return Promise.reject('Username should starts with @.');
        }
        try {
            const userData: User = await UserSerivce.viewProfile(
                username.slice(1)
            );
            setUser(userData);
        } catch (err: any) {
            console.log(err.message || 'Error occurred.');
            return Promise.reject('User not found.');
        }
    };

    useEffect(() => {
        // 假设用户确实存在,  否则应该弹出错误信息(校验)
        getUserProfile()
            .then(() => {
                // window.history.replaceState({}, '', `/users/@${user.username}`);
            })
            .catch((err) => {
                setError('User not found.');
                console.log(err.message || 'Error getting user profile.');
            });
        // 然后在此基础上, 刷新当前的url但不刷新页面
        // 使用window.history.replaceState
    }, [username]);

    const handleEditProfileOnClick = (
        e: React.MouseEvent<HTMLAnchorElement>
    ) => {
        e.preventDefault();
        navigate(`/me/settings/account`);
    };

    return (
        <ProfileContext.Provider value={{ user, authUser }}>
            <div>
                <NavBar displaytype={NavBarDisplayType.SECONDARY}></NavBar>
                <S.ProfileContainer>
                    {error && (
                        <div className="profile-error-container">
                            <h1>{error}</h1>
                        </div>
                    )}
                    {!error && (
                        <div className="profile-container">
                            <div className="profile-left-container">
                                <div className="profile-left-header">
                                    <div className="profile-left-header-avatar-container">
                                        <img src={user?.avatar}></img>
                                    </div>
                                    <h1>{user?.username}</h1>
                                </div>
                                <div className="profile-left-navbar-container">
                                    <NavLink to="./about">About</NavLink>
                                    <NavLink to="./blogs">Blogs</NavLink>
                                </div>
                                <Outlet />
                            </div>
                            <div className="profile-right-container">
                                <div className="profile-right-avatar-container">
                                    <img src={user?.avatar}></img>
                                </div>
                                <span className="profile-right-username">
                                    {user?.username}
                                </span>
                                {user?.username === authUser?.username && (<a
                                        className="profile-right-edit-profile"
                                        onClick={handleEditProfileOnClick}
                                    >
                                        Edit profile
                                    </a>) || null}
                            </div>
                        </div>
                    )}
                </S.ProfileContainer>
                <Footer />
            </div>
        </ProfileContext.Provider>
    );
};

export default Profile;
