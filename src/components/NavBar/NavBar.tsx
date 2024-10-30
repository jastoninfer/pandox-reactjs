import { ThunkDispatch } from 'redux-thunk';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useLinkClickHandler, useNavigate } from 'react-router-dom';

import logo from '../../static/logo.svg';
import logo_inv from '../../static/logo_inv.svg';
// import search_icon from '../../static/search.png';
import search_icon from '../../static/search-svgrepo-com.svg';
import edit_icon from '../../static/edit-4-svgrepo-com.svg';
import * as S from './style';

// import { __handleOverlayClick } from 'components/App/App';

import { logout } from '../../actions/auth';
import { SearchEService } from '../../services/data';
import { C_SearchBox } from 'constants/navbar.constant';
import { NavBarDisplayType,ScrollLevel } from 'enums/navbar.enum';
import type { _ReduxState, AuthState } from 'types/states';
import type { A_Any } from 'types/actions';
import type {
    PaginatedESPagesResData,
    PaginatedESUsersResData,
    SinglePaginatedESPage,
    SinglePaginatedESUser,
} from 'types/search.es';

import './index.css';

interface SearchBoxProps {
    handleOverlayClick: ()=>void;
}

const SearchBox: React.FC<SearchBoxProps> = React.memo(({handleOverlayClick}) => {
    const max_user_items = C_SearchBox.MAX_USER_ITEMS;
    const max_page_items = C_SearchBox.MAX_PAGE_ITEMS;
    const min_search_length = C_SearchBox.MIN_SEARCH_QUERY_LEN;
    const navigate = useNavigate();
    const lastRequestTime = useRef<number>(0);
    // const lastResponseTime = useRef(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [candidateUsers, setCandidateUsers] = useState<
        SinglePaginatedESUser[]
    >([]);
    const [candidatePages, setCandidatePages] = useState<
        SinglePaginatedESPage[]
    >([]);
    const minRequestGap = C_SearchBox.MIN_REQUEST_TIME_GAP;
    const holdonGap = C_SearchBox.HOLD_ON_TIME_GAP;
    // let lastRequestTime = 0;
    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value: string = e.target.value;
        setSearchTerm(value);
        const currentTime: number = Date.now();
        lastRequestTime.current = currentTime;
        if (value.length >= min_search_length) {
            setTimeout(() => {
                if (currentTime >= lastRequestTime.current) {
                    try {
                        SearchEService.searchUser(value)
                            .then((data: PaginatedESUsersResData) => {
                                if (
                                    currentTime >= lastRequestTime.current
                                ) {
                                    const results: SinglePaginatedESUser[] =
                                        data.results;
                                    setCandidateUsers(
                                        results.slice(0, max_user_items)
                                    );
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                        SearchEService.searchPage(value)
                            .then((data: PaginatedESPagesResData) => {
                                if (
                                    currentTime >= lastRequestTime.current
                                ) {
                                    const results = data.results;
                                    setCandidatePages(
                                        results.slice(0, max_page_items)
                                    );
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } catch (err: any) {
                        console.log(err.message || 'Error occurred.');
                    }
                }
            }, holdonGap);
        } else {
            setCandidateUsers([]);
            setCandidatePages([]);
        }
    };

    const handleSearchSubmitOnClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        if (searchTerm) {
            // 搜索内容不为空
            handleOverlayClick();
            navigate(`/search/${searchTerm}`);
            return;
        }
    };

    const handleCandidatePageOnClick =
        (pageItem: SinglePaginatedESPage) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleOverlayClick();
            // console.log('pageItem');
            // console.log(pageItem);
            // console.log('navigate-->', pageItem._source.id);
            navigate(
                `/pages/@${pageItem._source.author}/${pageItem._source.id}`
            );
        };

    const handleCandidateUserOnClick =
        (userItem: SinglePaginatedESUser) =>
        (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            handleOverlayClick();
            navigate(`/users/@${userItem._source.username}`);
        };

    return (
        <S.SearchBox>
            <div className="input-search">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Input username/page title..."
                />
                <button onClick={handleSearchSubmitOnClick}>GO</button>
            </div>
            <div className="search-suggestions">
                <span className="search-suggestions-span">
                    Your search suggestions
                </span>
                {/* <br></br> */}
                {candidatePages.length > 0 ? (
                    <div className="search-results-container">
                        {/* <span>Your search suggestions</span> */}
                        <div className="search-page-header">Pages</div>
                        {candidatePages.map((pageItem, index) => (
                            <div
                                key={index}
                                className="search-results-item"
                                onClick={handleCandidatePageOnClick(
                                    pageItem
                                )}
                            >
                                {pageItem._source.title}
                            </div>
                        ))}
                    </div>
                ) : null}
                {candidateUsers.length > 0 ? (
                    <div className="search-results-container">
                        <div className="search-user-header">Users</div>
                        {candidateUsers.map((userItem, index) => (
                            <div
                                key={index}
                                className="search-results-item"
                                onClick={handleCandidateUserOnClick(
                                    userItem
                                )}
                            >
                                {userItem._source.username}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </S.SearchBox>
    );
});

interface DropDownProps {
    container: React.ReactElement;
    child: React.ReactElement;
    menu: React.ReactElement[];
}

const DropDown: React.FC<DropDownProps> = ({ container, child, menu }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    return React.cloneElement(
        container,
        {
            onClick: (e: React.MouseEvent<HTMLDivElement>) => {
                setOpen(true);
            },
        },
        [
            child,
            open && (
                <div className="Login-Menu" key={1}>
                    {menu.map((menuItem, index) => (
                        <div className="Login-Menu-Button" key={index}>
                            {React.cloneElement(menuItem, undefined)}
                        </div>
                    ))}
                    <div
                        className="overlay"
                        onClick={(e) => {
                            setOpen(false);
                            e.stopPropagation();
                        }}
                    ></div>
                </div>
            ),
        ]
    );
};

interface NavBarProps {
    displaytype?: NavBarDisplayType;
    ext?: JSX.Element;
}

const NavBar: React.FC<NavBarProps> = ({ displaytype, ext }) => {
    // const [scrollLevel, setScrollLevel] = useState<ScrollLevel>(ScrollLevel.TOP);
    const scrollLevelRef = useRef<ScrollLevel>(ScrollLevel.TOP);

    const { isLoggedin, user } = useSelector<_ReduxState, AuthState>(
        (state) => state.auth
    );
    const [showSearchBox, setShowSearchBox] = useState<boolean>(false);

    const navBarRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const overlayEle = document.querySelector('.App div.overlay') as HTMLElement;

    const navigate: NavigateFunction = useNavigate();
    const dispatch: ThunkDispatch<_ReduxState, void, A_Any> = useDispatch();

    const newPageOnClick = () => {
        navigate(`/new_page`, { state: { new_page: false } });
    };

    const handleLogout = () => {
        dispatch(logout());
    };
    useEffect(()=> console.log('render again...'));
    

    const handleSearchClick = () => {
        // enable overlay
        setShowSearchBox(true);
        // overlayEle.style.display='block';
        document.body.classList.add('overlay-active');
    };

    const handleOverlayClick = useCallback(() => {
        // disable overlay
        setShowSearchBox(false);
        
        document.body.classList.remove('overlay-active');
        // overlayEle.style.display = 'none';
        // __handleOverlayClick();
    }, []);

    // useEffect(() => {
    //     // const overlayEle = document.querySelector('.App div.overlay') as Element;
    //     overlayEle.addEventListener('click', handleOverlayClick);
    //     return () => {
    //         overlayEle.removeEventListener('click', handleOverlayClick);
    //     }
    // }, []);

    useEffect(() => {
        const handleScroll = () => {
            const offset: number = window.scrollY;
            const viewportHeight: number = window.innerHeight;
            if (offset > viewportHeight * 0.3) {
                // setScrollLevel(ScrollLevel.MAIN);
                if(displaytype !== NavBarDisplayType.SECONDARY && scrollLevelRef.current === ScrollLevel.TOP) {
                    // set background-color; height; border-bottom
                    scrollLevelRef.current = ScrollLevel.MAIN;
                    navBarRef.current?.style.setProperty('background-color', '#ffffff');
                    navBarRef.current?.style.setProperty('height', '60px');
                    navBarRef.current?.style.setProperty('border-bottom', '1.0px solid #f0f0f0');
                    navBarRef.current?.style.setProperty('font-size', '1rem');
                    // navBarRef.current?.style.setProperty('color', 'black');
                    buttonsRef.current?.style.setProperty('color', 'black');
                    const tem = navBarRef.current?.querySelector('.Nav-Bar-Logo') as HTMLImageElement|undefined;
                    if(tem){
                        tem.src = logo;
                    }
                        // tem.style.setProperty('src', logo);
                        // console.log(navBarRef.current?.querySelector('.Nav-Bar-Logo'));
                        // tem.style.setProperty('filter', 'xss');
                        // console.log(navBarRef.current?.querySelector('.Nav-Bar-Logo'));
                    // }
                    // console.log('123');
                    // const tem = navBarRef.current?.querySelector('.Nav-Bar-Logo');
                    // if(tem){
                    //     tem.setAttribute('filter', 'invert(1)');
                    // }
                }
            } else {
                // setScrollLevel(ScrollLevel.TOP);
                if(displaytype !== NavBarDisplayType.SECONDARY && scrollLevelRef.current === ScrollLevel.MAIN) {
                    scrollLevelRef.current = ScrollLevel.TOP;
                    navBarRef.current?.style.setProperty('background-color', 'rgba(0,0,0,0)');
                    // navBarRef.current?.style.setProperty('background-color', '#ffffff');
                    navBarRef.current?.style.setProperty('height', '80px');
                    navBarRef.current?.style.setProperty('border-bottom', '0');
                    // navBarRef.current?.style.setProperty('color', 'white');
                    buttonsRef.current?.style.setProperty('color', 'white');
                    navBarRef.current?.style.setProperty('font-size', '1.1rem');
                    // console.log('456');
                    const tem = navBarRef.current?.querySelector('.Nav-Bar-Logo') as HTMLImageElement|undefined;
                    if(tem){
                        tem.src = logo_inv;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogoClick = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        navigate('/');
    };

    const handleUsernameOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/users/@${user?.username}`);
    };

    const handleSettingsOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        navigate(`/me/settings`);
    };

    const handleNotificationsOnClick = (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.preventDefault();
        navigate(`/me/notifications`);
    };

    return (
        <S.NavBar
            id="navbar"
            displaytype={displaytype}
            logged_in={isLoggedin.toString()}
            ref = {navBarRef}
        >
            <img
                src={displaytype===NavBarDisplayType.SECONDARY&&logo||logo_inv}
                alt="logo"
                className="Nav-Bar-Logo"
                onClick={handleLogoClick}
            ></img>
            <div className="Nav-Bar-Extensions">
                {ext}
            </div>
            <div id="NavBarButtons" ref={buttonsRef}>
                <div
                    className="Nav-Bar-Button"
                    id="Nav-Bar-Button-Search"
                    onClick={handleSearchClick}
                >
                    {/* <img
                        src={search_icon}
                        alt="search"
                        className="Nav-Bar-Icon"
                    ></img> */}
                    <i className="fa-solid fa-magnifying-glass"></i>
                    {/* <i className="Nav-Bar-Icon fa-solid fa-magnifying-glass"></i> */}
                </div>
                <div
                    className="Nav-Bar-Button"
                    id="Nav-Bar-Button-NewPage"
                    onClick={newPageOnClick}
                >
                    {/* <img
                        src={edit_icon}
                        alt="new"
                        className="Nav-Bar-Icon"
                    ></img> */}
                    <i className="fa-solid fa-feather-pointed"></i>
                    {/* <i className="Nav-Bar-Icon fa-solid fa-feather-pointed"></i> */}
                </div>
                {isLoggedin ? (
                    <DropDown
                        container={
                            <div
                                className="Nav-Bar-Button"
                                id="Nav-Bar-Button-Menu"
                            ></div>
                        }
                        child={
                            <div className="Nav-Bar-Avatar-Container" key={0}>
                                <img src={user?.avatar} alt="avatar"></img>
                            </div>
                        }
                        // child={<span key={0}>{user.username}</span>}
                        menu={[
                            <div
                                className="Login-Menu-Username"
                                onClick={handleUsernameOnClick}
                            >
                                <i className="fa-solid fa-user"></i>
                                {user?.username}
                            </div>,
                            <div className="login-menu-border"></div>,
                            <div onClick={handleSettingsOnClick}>
                                <i className="fa-solid fa-gear"></i>
                                Settings
                            </div>,
                            <div onClick={handleNotificationsOnClick}>
                                <i className="fa-solid fa-bell"></i>
                                Notifications
                            </div>,
                            <div className="login-menu-border"></div>,
                            <div
                                className="Nav-Bar-Logout"
                                onClick={handleLogout}
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                Log out
                            </div>,
                        ]}
                    />
                ) : (
                    <DropDown
                        container={<div className="Nav-Bar-Button"></div>}
                        child={
                            <span key={0} id="Nav-Bar-Button-Signup">
                                {/* Sign up */}
                                <i className="fa-solid fa-user-plus"></i>
                            </span>
                        }
                        menu={[
                            <div
                                onClick={() => {
                                    navigate('/login');
                                }}
                            >
                                <i className="fa-solid fa-user"></i>
                                Sign in
                            </div>,
                            <div
                                onClick={() => {
                                    navigate('/register');
                                }}
                            >
                                <i className="fa-solid fa-user-plus"></i>
                                Sign up
                            </div>,
                        ]}
                    />
                )}
                {showSearchBox && (
                    <div>
                        <div
                            className="overlay overlay-dark"
                            onClick={handleOverlayClick}
                        ></div>
                        <SearchBox handleOverlayClick={handleOverlayClick}/>
                    </div>
                )}
            </div>
        </S.NavBar>
    );
};

export default NavBar;
