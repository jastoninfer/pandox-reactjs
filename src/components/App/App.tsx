import { Routes, Route } from 'react-router-dom';

import PageMain from '../PageMain/PageMain';
import NewPageEdit from '../NewPageEdit/NewPageEdit';
import PageIntro from '../PageIntro/PageIntro';
import Profile from '../Profile';
import { ProfileAbout, ProfileBlogs } from '../Profile/Profile';
import {
    PageEditTabContentEditor,
    PageEditTabContentPreviewer,
} from '../NewPageEdit/NewPageEdit';
import Register from '../Register';
import Login from '../Login';
import Search from '../Search/Search';
import Me from '../Me/Me';
import Settings from '../Settings/Settings';
import { SettingsAccount } from '../Settings/Settings';
import Notifications from '../Notifications/Notifications';
import { NotificationsResponses } from '../Notifications/Notifications';
import { SearchPages, SearchUsers } from '../Search/Search';
import { useCallback, useEffect, useState } from 'react';

import '../../index.css';
import 'katex/dist/katex.css';

import { useBackgroundTasks } from '../../backendTasks';

// export const __handleOverlayClick = () => {
//     // disable overlay
//     // setShowSearchBox(false);
//     document.body.classList.remove('overlay-active');
// }

const App = () => {
    useBackgroundTasks();

    // const [navExt, setNavExt] = useState(null);

    // useEffect(() => {
    //     console.log(navExt);
    // }, [navExt]);

    return (
        <div className="App">
            {/* <div className="overlay overlay-dark"/> */}
            {/* </div> */}
            <Routes>
                <Route index element={<PageIntro />} />
                <Route path="me" element={<Me />}></Route>
                <Route path="me/settings" element={<Settings />}>
                    <Route
                        path=""
                        element={<SettingsAccount parentMatch="" />}
                    />
                    <Route path="account" element={<SettingsAccount />} />
                </Route>
                <Route path="me/notifications" element={<Notifications />}>
                    <Route
                        path=""
                        element={<NotificationsResponses parentMatch="" />}
                    />
                    <Route
                        path="responses"
                        element={<NotificationsResponses />}
                    />
                </Route>
                <Route path="users/:username" element={<Profile />}>
                    <Route path="" element={<ProfileAbout parentMatch="" />} />
                    <Route path="about" element={<ProfileAbout />} />
                    <Route path="blogs" element={<ProfileBlogs />} />
                </Route>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="pages/:wildcard/:pageId" element={<PageMain />} />
                <Route path="p/:pageId/edit" element={<NewPageEdit/>}>
                    <Route
                        path=""
                        element={<PageEditTabContentEditor parentMatch="" />}
                    />
                    <Route
                        path="editor"
                        element={<PageEditTabContentEditor />}
                    />
                    <Route
                        path="previewer"
                        element={<PageEditTabContentPreviewer />}
                    />
                </Route>
                <Route path="new_page" element={<NewPageEdit/>}>
                    <Route
                        path=""
                        element={<PageEditTabContentEditor parentMatch="" />}
                    />
                    <Route
                        path="editor"
                        element={<PageEditTabContentEditor />}
                    />
                    <Route
                        path="previewer"
                        element={<PageEditTabContentPreviewer />}
                    />
                </Route>
                <Route path="search/:searchTerm" element={<Search />}>
                    <Route path="" element={<SearchPages parentMatch="" />} />
                    <Route path="pages" element={<SearchPages />} />
                    <Route path="users" element={<SearchUsers />} />
                </Route>
                <Route path="*" element={<span>404 Not found.</span>} />
            </Routes>
        </div>
    );
};

export default App;
