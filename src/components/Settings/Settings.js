import * as S from './style';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { ImageService, UserSerivce } from '../../services/data';
import { updateProfile } from '../../actions/auth';

export const SettingsAccount = ({parentMatch}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const [popupWindow, setPopupWindow] = useState('');

    const avatarInputRef = useRef(null);
    const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selfIntroData, setSelfIntroData] = useState(user?.selfIntro);

    const handleAvatarUpdateOnClick = (e) => {
        avatarInputRef?.current.click();
    };

    const handleAvatarInputChange = (e) => {
        const file = e.target.files[0];
        // console.log('file is', file);
        // 如果最终选择了取消上传, 那么file将会是undefined
        if (file) {
            if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setAvatarPreview(reader.result);
                    setSelectedAvatarFile(file);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a PNG or JPEG image.');
            }
        }
    };

    const handleSelfIntroInputChange = (e) => {
        setSelfIntroData(e.target.value);
    }

    const handleProfileInfoOnClick = () => {
        setPopupWindow('ProfileInfo');
        setSelfIntroData(user?.selfIntro);
        document.body.classList.add('overlay-active');
    };

    const handleOverlayClick1 = () => {
        // disable overlay
        // console.log('overlay clicked...');
        setPopupWindow('');
        setAvatarPreview(null); // 预览头像数据清空
        setSelectedAvatarFile(null); // 预览选取文件清空
        // setSelfIntroData(user?.selfIntro); // 个人简介恢复为默认(empty也可)
        // console.log(popupWindow);
        document.body.classList.remove('overlay-active');
    };

    const handleProfileSaveOnClick = async (e) => {
        // 首先上传图片(如果有新传入图片)
        // 然后更新profile, 成功之后, 关闭弹窗
        // 如果出现错误, 弹出错误信息

        // 此外, 或许应该考虑, 当用户点击Save后, 短暂禁用该按钮, 直到
        // 上传结果(成功或失败)被返回
        try {
            let avatar_fname = null;
            if(avatarPreview) {
                // 用户选择了上传新的avatar
                const formData = new FormData();
                formData.append('image', selectedAvatarFile);
                try {
                    console.log('<<<<0000');
                    avatar_fname = (await ImageService.addImage(formData)).data?.filename;
                    console.log('>>>>>000');
                    console.log('avatar_fname is ', avatar_fname);
                } catch (err) {
                    alert('Error uploading avatar');
                    console.log('Error uploading file: ', err);
                    return;
                }
            }
            console.log('+++++++++++');
            // const newProfile = avatar_fname ? {
            //     avatar: avatar_fname,
            //     selfIntro: selfIntroData,
            // } : {selfIntro: selfIntroData};
            const newProfile = {
                ...(avatar_fname && {avatar: avatar_fname}),
                ...(selfIntroData && {selfIntro: selfIntroData}),
            };
            console.log('---------------');
            console.log('new profile is', newProfile);
            dispatch(updateProfile(newProfile));
            console.log('.>>>>.............');
            // const res = await UserSerivce.updateProfile(newProfile);
            // 需要考虑一个问题, 当用户更改其profile之后, 需要更改本地的内容
            // 也就是redux中的本地user的数据
            // 关闭窗口
            handleOverlayClick1();
        } catch (err) {
            console.log('Error during updating profile: ', err);
        }
    };

    useEffect(() => {
        if(user && parentMatch === '') {
            navigate(location.pathname + '/account');
            return;
        }
    }, [user]);
    return (
        <div className='settings-account-container'>
            <div className='settings-accountitem-container'>
                <div className='settings-accountitem-left-container'>
                    Email address
                </div>
                <div className='settings-accountitem-right-container'>
                    {user?.email}
                </div>
            </div>
            <div className='settings-accountitem-container'>
                <div className='settings-accountitem-left-container'>
                    Username
                </div>
                <div className='settings-accountitem-right-container'>
                    {`@${user?.username}`}
                </div>
            </div>
            <div className='settings-accountitem-container' onClick={handleProfileInfoOnClick}>
                <div className='settings-accountitem-left-container'>
                    Profile Info
                </div>
                <div className='settings-accountitem-right-container'>
                    {/* {`@${user?.username}`} */}
                    <span>{`@${user?.username}`}</span>
                    <div className='settings-accountitem-avatar-container'>
                        <img src={user?.avatar}></img>
                    </div>
                </div>
                {/* {popupWindow==='ProfileInfo' && (
                    <div>
                        <div className='overlay overlay-dark' onClick={handleOverlayClick1}></div>
                        <div className='popup-window'>
                            123
                        </div>
                    </div>
                )} */}
            </div>
            <div className='settings-accountitem-border'></div>
            <div className='settings-accountitem-container'>
                <div className='settings-accountitem-left-container settings-accountitem-warning'>
                    Delete your account
                </div>
            </div>
            {popupWindow==='ProfileInfo' && (
                <div>
                    <div className='overlay overlay-dark'></div>
                    <div className='popup-window'>
                        <span className='popup-window-header'>
                            Profile information
                        </span>
                        <div className='popup-window-avatarinfo-container'>
                            <span>Avatar</span>
                            <div className='popup-window-avatarrow-container'>
                                <div className='popup-window-avatarrow-left-container'>
                                    <img src={avatarPreview || user?.avatar}></img>
                                </div>
                                <div className='popup-window-avatarrow-right-container'>
                                    <div className='popup-window-avatarrow-right-btns-container'>
                                        <span className='update' onClick={handleAvatarUpdateOnClick}>
                                            Update
                                        </span>
                                        <span className='remove'>
                                            Remove
                                        </span>
                                    </div>
                                    <div className='popup-window-avatarrow-right-desc-container'>
                                        Recommended formats: JPEG, PNG.
                                    </div>
                                    <input className='popup-window-avatar-uploadfile'
                                        type='file'
                                        accept='.png, .jpeg, .jpg'
                                        ref={avatarInputRef}
                                        onChange={handleAvatarInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='popup-window-selfintro-container'>
                            <span>Self intro</span>
                            <textarea
                                type='text'
                                defaultValue={selfIntroData}
                                onChange={handleSelfIntroInputChange}
                            />
                        </div>
                        <div className='popup-window-border'></div>
                        <div className='popup-window-bottom-container'>
                            <div className='popup-window-bottom-btns-container'>
                                <button className='cancel' onClick={handleOverlayClick1}>
                                    Cancel
                                </button>
                                <button className='save' onClick={handleProfileSaveOnClick}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

const Settings = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate(`/login`);
        }
    }, [user]);

    return (user&&(
        <div>
            <NavBar displaytype='secondary'/>
            <S.SettingsContainer>
                <div className='settings-left-container'>
                    <div className='profile-left-header'>
                        <h1>
                            Settings
                        </h1>
                    </div>
                    <div className='settings-left-navbar-container'>
                        <NavLink to='./account'>Account</NavLink>
                        {/* 或许可以增加一个Security的tab允许用户更改密码 */}
                    </div>
                    <Outlet/>
                </div>
                <div className='settings-right-container'>
                </div>
            </S.SettingsContainer>
            <Footer/>
        </div>
    ));
}

export default Settings;
