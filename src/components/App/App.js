// import logo from './logo.svg';
import '../../index.css';
// import React, { useState } from 'react';
import "katex/dist/katex.css";
import { Routes, Route } from 'react-router-dom';

import PageMain from '../PageMain/PageMain';
// import PageEdit from '../PageEdit/PageEdit';
import NewPageEdit from '../NewPageEdit/NewPageEdit';
import PageIntro from '../PageIntro/PageIntro';
import Profile from '../Profile';
import {ProfileAbout, ProfileBlogs} from '../Profile/Profile';
import {PageEditTabContentEditor, PageEditTabContentPreviewer} from '../NewPageEdit/NewPageEdit';
import Register from '../Register';
import Login from '../Login';
import Search from '../Search/Search';
import Me from '../Me/Me';
import Settings from '../Settings/Settings';
import { SettingsAccount } from '../Settings/Settings';
import Notifications from '../Notifications/Notifications';
import { NotificationsResponses } from '../Notifications/Notifications';
import { SearchPages, SearchUsers } from '../Search/Search';

import { useBackgroundTasks } from '../../backendTasks';

const App = () => {
	useBackgroundTasks();
	return (
		<div className="App">
			<Routes>
				<Route index element = {<PageIntro/>} />
				<Route path='me' element={<Me/>}>
				</Route>
				<Route path='me/settings' element={<Settings/>}>
					<Route path='' element={<SettingsAccount parentMatch=''/>}></Route>
					<Route path='account' element={<SettingsAccount/>}></Route>
				</Route>
				<Route path='me/notifications' element={<Notifications/>}>
					<Route path='' element={<NotificationsResponses parentMatch=''/>}></Route>
					<Route path='responses' element={<NotificationsResponses/>}></Route>
				</Route>
				<Route path='users/:username' element={<Profile/>}>
					<Route path='' element={<ProfileAbout parentMatch=''/>}></Route>
					<Route path='about' element={<ProfileAbout/>}></Route>
					<Route path='blogs' element={<ProfileBlogs/>}></Route>
				</Route>
				<Route path='register' element={<Register/>}/>
				<Route path='login' element={<Login/>}/>
				<Route path='pages/:wildcard/:pageId' element={<PageMain/>}/>
				{/* <Route path='/:wildcard/:pageId/edit' element={<PageEdit/>}/> */}
				<Route path='p/:pageId/edit' element={<NewPageEdit/>}>
					<Route path='' element={<PageEditTabContentEditor parentMatch=''/>}></Route>
					<Route path='editor' element={<PageEditTabContentEditor/>}></Route>
					<Route path='previewer' element={<PageEditTabContentPreviewer/>}></Route>
				</Route>
				<Route path='new_page' element={<NewPageEdit/>}>
					<Route path='' element={<PageEditTabContentEditor parentMatch=''/>}></Route>
					<Route path='editor' element={<PageEditTabContentEditor/>}></Route>
					<Route path='previewer' element={<PageEditTabContentPreviewer/>}></Route>
				</Route>
				<Route path='search/:searchTerm' element={<Search/>}>
					<Route path='' element={<SearchPages parentMatch=''/>}></Route>
					<Route path='pages' element={<SearchPages parentMatch='pages'/>}></Route>
					<Route path='users' element={<SearchUsers parentMatch='users'/>}></Route>
				</Route>
				<Route path='*' element={<span>404 Not found.</span>}/>
			</Routes>
		</div>
	);
}

export default App;
