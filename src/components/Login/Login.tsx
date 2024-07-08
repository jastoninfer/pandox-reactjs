import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';


import { ThunkDispatch } from 'redux-thunk';

import { login } from '../../actions/auth';
import * as S from './style';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { clearMessage } from '../../actions/message';
import type { _ReduxState, AuthState, MessageState } from 'types/states';
import type { UserLogin } from 'types/user';
import type { A_Any } from 'types/actions';

const Login = () => {
    const form = useRef<any>(null);
    const navigate:NavigateFunction = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const {isLoggedin} = useSelector<_ReduxState, AuthState>(state => {
        return state.auth;
    });

    const {message} = useSelector<_ReduxState, MessageState>(state => {
        return state.message;
    });

    const onChangeUsername = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e:React.ChangeEvent<HTMLInputElement>):void => {
        const password = e.target.value;
        setPassword(password);
    }

    const dispatch:ThunkDispatch<_ReduxState, void, A_Any> = useDispatch();

    const handleLogin = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        // console.log('try to log in');
        setLoading(true);
        const userLogin: UserLogin = {username, password};
        dispatch(login(userLogin))
        .then(() => {
            // 跳转前清除message
            dispatch(clearMessage());
            navigate('/');
            // window.location.reload(); // 重新加载当前页面, 类似于刷新
        }).catch((err) => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if(isLoggedin) {
            // 重定向到主页
            navigate('/');
        }
    },[isLoggedin]);

    return (
        <div>
            <NavBar displaytype='secondary'></NavBar>
            <S.LoginContainer>
                <form onSubmit={handleLogin}>
                    <div className='username-container'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className='pwd-container'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <button disabled={loading} className='login-btn'>
                        {loading && 'loading...' ||
                        'Log in'}
                    </button>
                    {/* 登录成功不会有message */}
                    {message && (
                        <div role='alert' className='alert-fail'>
                            {message}
                        </div>
                    )}
                </form>
            </S.LoginContainer>
            <Footer/>
        </div>
    );
};

export default Login;