import logo from '../../static/logo.ico';
import search_icon from '../../static/search.png';
import edit_icon from '../../static/edit.png';
import { useNavigate } from 'react-router-dom';
import * as S from './style';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/auth';
import { SearchEService } from '../../services/data';
import './index.css';

const NavBar = ({displaytype}) => {

    const [scrollLevel, setScrollLevel] = useState(0);

    // const [isSticky, setIsSticky] = useState(false);
    // const isLoggedIn = useSelector(state => {
    //     console.log('state.auth', state.auth);
    //     console.log('return value', state.auth.isLoggedIn || false);
    //     return state.auth.isLoggedIn || false;
    // });
    const {isLoggedin, user} = useSelector(state => state.auth);
    // const {user} = useSelector(state=>state.auth);
    const [showSearchBox, setShowSearchBox] = useState(false);

    const [showLoginMenu, setShowLoginMenu] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const newPageOnClick = () => {
        // console.log('edit clicked...xxx');
        // pageData.id && navigate(`/new_page`);
        navigate(`/new_page`, {state: {new_page: false}});
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSearchClick = () => {
        // enable overlay
        setShowSearchBox(true);
        document.body.classList.add('overlay-active');
    };

    const handleOverlayClick = () => {
        // disable overlay
        setShowSearchBox(false);
        document.body.classList.remove('overlay-active');
    };

	// const { sendJsonMessage, lastJsonMessage, 
    //     readyState, getWebSocket } = useWebSocket(WS_URL, {
    //         share: true,
    //         onOpen: () => {
    //             console.log('Websocket connection established.');
    //         }
    //     });
    // const { sendJsonMessage, lastJsonMessage, 
    //  readyState, getWebSocket } = useWebSocket(WS_URL, {
    //     share: true,
    //     onOpen: () => {
    //         console.log('Websocket connection established.');
    //     }
    // });
	
    // useEffect(() => {
	// 	const intervalId = setInterval(() => {
    //         // console.log('++++');
    //         // console.log(isLoggedin);
	// 		isLoggedin && sendJsonMessage({
    //             type: 'autologout',
    //             content: user.accessToken,
    //         });
	// 	}, 5*1000);
	// 	return () => {
	// 		clearInterval(intervalId);
	// 	};
	// }, []);



    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            const viewportHeight = window.innerHeight;
            if (offset > viewportHeight * 0.3) {
                setScrollLevel(1);
            } else {
                setScrollLevel(0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // console.log('isloggedin is', isLoggedIn);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const SearchBox = () => {
        const max_user_items = 3;
        const max_page_items = 5;
        const min_search_length = 2;
        const lastRequestTime = useRef(0);
        // const lastResponseTime = useRef(0);
        const [searchTerm, setSearchTerm] = useState('');
        const [candidateUsers, setCandidateUsers] = useState([]);
        const [candidatePages, setCandidatePages] = useState([]);
        const minRequestGap = 2000;
        const holdonGap = 300;
        // let lastRequestTime = 0;
        const handleSearchInputChange = (e) => {
            const value = e.target.value;
            setSearchTerm(value);
            const currentTime = Date.now();
            lastRequestTime.current = currentTime;
            if (value.length >= min_search_length) {
                setTimeout(() => {
                    if (currentTime >= lastRequestTime.current) {
                        try {
                            SearchEService.searchUser(value).then((res) => {
                                if (currentTime >= lastRequestTime.current) {
                                    const data = res.data.results || [];
                                    // console.log('value', value);
                                    // console.log(data);
                                    setCandidateUsers(data.slice(0, max_user_items));
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                            SearchEService.searchPage(value).then((res) => {
                                if (currentTime >= lastRequestTime.current) {
                                    const data = res.data.results || [];
                                    // console.log('value', value);
                                    // console.log(data);
                                    setCandidatePages(data.slice(0, max_page_items));
                                }
                            }).catch((err) => {
                                console.log(err);
                            });
                        } catch (err) {
                            console.log(err.message || 'Error occurred.');
                        }
                    }
                }, holdonGap);
            } else {
                setCandidateUsers([]);
                setCandidatePages([]);
                // lastRequestTime.current = currentTime;
            }
        };
        const xxhandleSearchInputChange = (e) => {
            const value = e.target.value;
            const currentTime = Date.now();
            setSearchTerm(value);
            if (value.length >= min_search_length && (currentTime - lastRequestTime.current >= minRequestGap)) {
                // console.log('ok');
                try {
                    SearchEService.searchUser(value).then((res) => {
                        // console.log('1', currentTime);
                        // console.log('2', lastRequestTime.current);
                        // console.log('data', res.data);
                        const data = res.data.results || [];
                        console.log('value', value);
                        console.log(data);
                        if(currentTime >= lastRequestTime.current) {
                            setCandidateUsers(data.slice(0, max_user_items));
                        }
                    });
                    SearchEService.searchPage(value).then((res) => {
                        const data = res.data.results || [];
                        if(currentTime >= lastRequestTime.current) {
                            setCandidatePages(data.slice(0, max_page_items));
                        }
                    });
                } catch (err) {
                    console.log(err.message || 'Error occurred.');
                }
                lastRequestTime.current = currentTime;
            } else if (value.length < min_search_length) {
                setCandidateUsers([]);
                setCandidatePages([]);
                lastRequestTime.current = currentTime;
            } else {
                // setCandidateUsers([]);
                // setCandidatePages([]);
            }
            // 希望随着searchTerm的改变, 迅速调整candiateUsers/Pages的显示
            // 但是我们需要考虑一些问题
            // 1. state是batch更新的, 不是即时的
            // 2. 如果searchTerm变化频率很快, 发出的请求/网络过于密集, 可能会导致网络错误[√]
            // 3. 在searchTerm从A变为B的过程，发起网络请求q(A)和q(B), 得到回复r(A)和r(B)
            // 如果r(B)比r(A)先到达, 我们不能先设置状态为r(B),在设置成r(A), 这是不符合异步
            // 处理要求的
        };

        const handleSearchSubmitOnClick = (e) => {
            e.preventDefault();
            if (searchTerm) {
                // 搜索内容不为空
                navigate(`/search/${searchTerm}`);
                return;
            }
        };

        const handleCandidatePageOnClick = (pageItem) => (e) => {
            e.preventDefault();
            handleOverlayClick();
            // console.log('pageItem');
            // console.log(pageItem);
            navigate(`/pages/@${pageItem._source.author}/${pageItem._source.id}`);
        };

        const handleCandidateUserOnClick = (userItem) => (e) => {
            e.preventDefault();
            handleOverlayClick();
            navigate(`/users/@${userItem._source.username}`);
        };

        return (
            <S.SearchBox>
                <div className='input-search'>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={handleSearchInputChange}
                        placeholder='Input username/page title...'
                    />
                    <button onClick={handleSearchSubmitOnClick}>
                        Go
                    </button>
                </div>
                <div className='search-suggestions'>
                    <span className='search-suggestions-span'>Your search suggestions</span>
                    {/* <br></br> */}
                    {candidatePages.length > 0 ? (
                        <div className='search-results-container'>
                            {/* <span>Your search suggestions</span> */}
                            <div className='search-page-header'>
                                Pages
                            </div>
                            {candidatePages.map((pageItem, index) => (
                                <div key={index} className='search-results-item'
                                    onClick={handleCandidatePageOnClick(pageItem)}>
                                    {pageItem._source.title}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {candidateUsers.length > 0 ? (
                        <div className='search-results-container'>
                            <div className='search-user-header'>
                                Users
                            </div>
                            {candidateUsers.map((userItem, index) => (
                                <div key={index} className='search-results-item'
                                    onClick={handleCandidateUserOnClick(userItem)}>
                                    {userItem._source.username}
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
            </S.SearchBox>
        )
    };

    const DropDown = ({container, child, menu}) => {
        const [open, setOpen] = React.useState(false);
        return React.cloneElement(container, {
            onClick: (e) => {
                setOpen(true);
                // console.log('there..');
                // console.log(e);
                // e.preventDefault();
            },
            // onMouseEnter: () => {
            //     console.log('open');
            //     // setOpen(true);
            // },
            // onMouseLeave: () => {
            //     // console.log('close');
            //     setOpen(false);
            // }
        },[
            child,
            open && (<div className='Login-Menu' key={1}>
                {menu.map((menuItem, index) => (
                    <div className='Login-Menu-Button' key={index}>
                        {React.cloneElement(menuItem, null)}
                    </div>
                ))}
                {/* <div style={{position: 'absolute',top: -10,left: -10,right: -10,bottom: -10,zIndex: 1,pointerEvents: 'none'}}></div> */}
                <div className='overlay' onClick={(e)=>{setOpen(false); e.stopPropagation();}}></div>
            </div>)
        ]
        );
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const handleUsernameOnClick = (e) => {
        e.preventDefault();
        navigate(`/users/@${user?.username}`);
        // console.log('username...');
    }

    const handleSettingsOnClick = (e) => {
        e.preventDefault();
        navigate(`/me/settings`);
        // console.log('settings');
    }

    const handleNotificationsOnClick = (e) => {
        e.preventDefault();
        navigate(`/me/notifications`);
        // console.log('notfi...');
    }

    // useEffect(()=>{
    //     console.log('logged in? ', isLoggedin);
    // });

    return (
        <S.NavBar id='navbar' scrolllevel={scrollLevel} displaytype={displaytype} user={user}>
            <img src={logo} alt='logo' className='Nav-Bar-Logo' onClick={handleLogoClick}></img>
            <div id='NavBarButtons'>
                <div className='Nav-Bar-Button' id='Nav-Bar-Button-Search' onClick={handleSearchClick}>
                    <img src={search_icon} alt='search' className='Nav-Bar-Icon'></img>
                </div>
                <div className='Nav-Bar-Button' id='Nav-Bar-Button-NewPage' onClick={newPageOnClick}>
                    <img src={edit_icon} alt='new' className='Nav-Bar-Icon'></img>
                </div>
                {
                    isLoggedin ?
                    <DropDown
                        container={<div className='Nav-Bar-Button' id='Nav-Bar-Button-Menu'></div>}
                        child={
                            <div className='Nav-Bar-Avatar-Container' key={0}>
                                <img src={user.avatar} alt='avatar'></img>
                            </div>}
                        // child={<span key={0}>{user.username}</span>}
                        menu={[
                            <div className='Login-Menu-Username' onClick={handleUsernameOnClick}>{user.username}</div>,
                            <div className='login-menu-border'></div>,
                            <div onClick={handleSettingsOnClick}>Settings</div>,
                            <div onClick={handleNotificationsOnClick}>Notifications</div>,
                            <div className='login-menu-border'></div>,
                            <div className='Nav-Bar-Logout' onClick={handleLogout}>Log out</div>,
                        ]}
                    />
                    : <DropDown
                        container={<div className='Nav-Bar-Button'></div>}
                        child={<span key={0} id='Nav-Bar-Button-Signup'>Sign up</span>}
                        menu={[
                            <div onClick={() => {navigate('/login');}}>Sign in</div>,
                            <div onClick={() => {navigate('/register');}}>Sign up</div>,
                        ]}
                      />
                }
                {showSearchBox && (
                    <div>
                        <div className='overlay overlay-dark' onClick={handleOverlayClick}></div>
                        <SearchBox/>
                    </div>
                )}
            </div>
        </S.NavBar>
    );
};

export default NavBar;