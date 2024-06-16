import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { login } from '../../actions/auth';
import * as S from './style';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { clearMessage } from '../../actions/message';

const Login = (props) => {
    const form = useRef(null);
    const navigate = useNavigate();
    const [username, setUsername] = useState('pandoxone');
    const [password, setPassword] = useState('1234');
    const [loading, setLoading] = useState(false);

    const {isLoggedin} = useSelector(state => {
        // console.log('state.auth', state.auth);
        return state.auth;
    });

    const {message} = useSelector(state => {
        // console.log('state.message', state.message);
        return state.message;
    });

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('try to log in');
        setLoading(true);
        dispatch(login(username, password))
        .then(() => {
            // 跳转前清除message
            dispatch(clearMessage());
            navigate('/');
            // window.location.reload(); // 重新加载当前页面, 类似于刷新
        }).catch(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        // console.log('run...');
        // console.log(isLoggedin);
        if(isLoggedin) {
            // 重定向到主页
            navigate('/');
        }
    },[isLoggedin]);

    // if(isLoggedIn) {
    //     return <Navigate to='/profile' />
    // }
    //  如果已经登录了, 就不应该再显示这个登录界面(输入框及提交按钮)

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
                    {message && message.message && (
                        <div role='alert' className='alert-fail'>
                            {message.message}
                        </div>
                    )}
                </form>
            </S.LoginContainer>
            <Footer/>
        </div>
    );
};

export default Login;