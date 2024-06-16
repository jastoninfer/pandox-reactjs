import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Inputx from 'react-validation/build/input';
import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmail} from 'validator';
import * as S from './style';
import NavBar from '../NavBar';
import Footer from '../Footer';

import { register, register_failed } from '../../actions/auth';
import { clearMessage } from '../../actions/message';
import { useNavigate } from 'react-router-dom';

const required = (value) => {
    if(!value) {
        return (
            <div role='alert'>
                This field is required!
            </div>
        );
    }
}

const vusername1 = (value) => {
    if (value.length < 5 || value.length > 25) {
        return (
            <div role='alert'>
                Username length must be between 5 and 25
            </div>
        );
    }
}

const validEmail1 = (value) => {
    if(!isEmail(value)){
        return (
            <div role='alert'>
                This is not a valid email.
            </div>
        );
    }
}

const vpassword1 = (value) => {
    if(value.length < 7 || value.length > 40) {
        return (
            <div role='alert'>
                This password length must be between 7 and 40
            </div>
        );
    }
}

const vusername = (value) => {
    // 长度限制5-25
    const regex = /^[a-z0-9]+$/;
    // 只允许小写字母, 与数字组合, 且必须由小写字母开头
    if(value.length < 5 || value.length > 25) {
        return 'Username length must be between 5 and 25.';
    }else if(regex.test(value) === false) {
        return 'Username: only lower case letters and digits allowed.'
    }else if(/^[a-z]/.test(value) == false) {
        return 'Username: must start with a lower case letter.';
    }
    return '';
};

const vemail = (value) => {
    if(!isEmail(value)) {
        return 'Please provide a valid email.';
    }
    return '';
};

const vpassword = (value) => {
    // 不对密码进行强度检查
    if(value.length < 4 || value.length > 20) {
        return 'Password length must be between 4 and 20.';
    }
    return '';
};

const vpasswordMatch = (pwd, pwd_confirm) => {
    if(pwd !== pwd_confirm) {
        return 'Passwords don\'t match.';
    }
    return '';
};

const Register = (props) => {
    const form = useRef(null);
    const [username, setUsername] = useState('pandox2');
    const [email, setEmail] = useState('astoninfer@gmail.com');
    const [password, setPassword] = useState('1234');
    const [passwordConfirm, setPasswordConfirm] = useState('1234');
    const [countdown, setCountdown] = useState(null);
    const intervalIdRef = useRef(null);

    const {message} = useSelector(state => {
        // console.log('state', state);
        // console.log('state-message', state.message);
        // return state.message.message ? state.message.message : 'Bad';
        return state.message;
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    }

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    }

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    }

    const onChangePasswordConfirm = (e) => {
        const passwordConfirm = e.target.value;
        setPasswordConfirm(passwordConfirm);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log('submit');
        // 在这里执行验证程序
        const message = vusername(username) || vemail(email) || 
            vpassword(password) || vpasswordMatch(password, passwordConfirm);
        if(message !== '') {
            return dispatch(register_failed(message)).catch(() => {
                setSuccessful(false);
            });
        }else {
            dispatch(register(username, email, password))
            .then(() => {
                // console.log('success');
                setSuccessful(true);
                // 重定向到登录界面
                // 清除message并重定向
                // setTimeout(() => {
                //     dispatch(clearMessage());
                //     navigate('/login');
                // }, 2000);
                setCountdown(3);
                // setInterval(() => {
                //     setCountdown((countdown) => (
                //         countdown-1
                //     ));
                // }, 1000);
            }).catch(() => {
                // console.log('fail');
                setSuccessful(false);
            });
        }
    };

    useEffect(() => {
        if(countdown === 3) {
            intervalIdRef.current = setInterval(() => {
                setCountdown((countdown) => (countdown - 1));
            }, 1000);
        }
        if(countdown === 0) {
            dispatch(clearMessage());
            navigate('/login');
            // 清除interval
        }
        return () => {
            if(countdown === 0) {
                // 清除interval
                clearInterval(intervalIdRef.current);
            }
        };
    }, [countdown]);

    const [successful, setSuccessful] = useState(false);
    return (
        <div>
        <NavBar displaytype='secondary'/>
        <S.RegisterContainer>
            {!successful && (
                <form onSubmit={handleRegister} ref={form}>
                    <div className='username-container'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </div>
                    <div className='email-container'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='text'
                            name='email'
                            value={email}
                            // placeholder='astoninfer@gmail.com'
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className='pwd-container'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            // placeholder='123456'
                            value={password}
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className='pwd-confirm-container'>
                        <label htmlFor='password-confirm'>Confirm Password</label>
                        <input
                            type='password'
                            name='password-confirm'
                            // placeholder='123456'
                            value={passwordConfirm}
                            onChange={onChangePasswordConfirm}
                        />
                    </div>
                    <button className='register-btn'>Sign up</button>
                </form>
            )}
            {/* message初始为null */}
            {message && message.message && (
                <div role='alert' className={successful ? 'alert-success': 'alert-fail'}>
                    {message.message + (successful?` Redirecting to login page...${countdown}`:'')}
                </div>
            )}
        </S.RegisterContainer>
        <Footer/>
        </div>
    );
}

export default Register;