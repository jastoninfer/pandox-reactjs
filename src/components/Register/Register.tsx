import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { isEmail } from 'validator';

import NavBar from '../NavBar';
import Footer from '../Footer';

import { register, register_failed } from '../../actions/auth';
import { clearMessage } from '../../actions/message';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import type { MessageState, _ReduxState } from 'types/states';
import type { A_Any } from 'types/actions';
import type { UserRegister } from 'types/user';

import { NavBarDisplayType } from 'enums/navbar.enum';
import { REGISTER_SUCCESS_COUNT_DOWN } from 'constants/register.constant';

import * as S from './style';

const vusername = (value: string): string => {
    // length limit: 5-25
    const regex = /^[a-z0-9]+$/;
    // only lower case letters and numbers allowed, must start with
    //  lower case letters
    if (value.length < 5 || value.length > 25) {
        return 'Username length must be between 5 and 25.';
    } else if (regex.test(value) === false) {
        return 'Username: only lower case letters and digits allowed.';
    } else if (/^[a-z]/.test(value) == false) {
        return 'Username: must start with a lower case letter.';
    }
    return '';
};

const vemail = (value: string): string => {
    if (!isEmail(value)) {
        return 'Please provide a valid email.';
    }
    return '';
};

const vpassword = (value: string): string => {
    // 不对密码进行强度检查
    if (value.length < 4 || value.length > 20) {
        return 'Password length must be between 4 and 20.';
    }
    return '';
};

const vpasswordMatch = (pwd: string, pwd_confirm: string): string => {
    if (pwd !== pwd_confirm) {
        return "Passwords don't match.";
    }
    return '';
};

const Register = () => {
    const form = useRef<HTMLFormElement>(null);
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [countdown, setCountdown] = useState<number>(-1);
    const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

    const { message } = useSelector<_ReduxState, MessageState>(
        (state) => state.message
    );

    const dispatch: ThunkDispatch<_ReduxState, void, A_Any> = useDispatch();
    const navigate: NavigateFunction = useNavigate();

    const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const username: string = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email: string = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password: string = e.target.value;
        setPassword(password);
    };

    const onChangePasswordConfirm = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const passwordConfirm: string = e.target.value;
        setPasswordConfirm(passwordConfirm);
    };

    const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 在这里执行验证程序
        const message: string =
            vusername(username) ||
            vemail(email) ||
            vpassword(password) ||
            vpasswordMatch(password, passwordConfirm);
        if (message !== '') {
            return dispatch(register_failed(message)).catch(() => {
                setSuccessful(false);
            });
        } else {
            const userRegister: UserRegister = { username, email, password };
            dispatch(register(userRegister))
                .then(() => {
                    setSuccessful(true);
                    setCountdown(REGISTER_SUCCESS_COUNT_DOWN);
                })
                .catch(() => {
                    setSuccessful(false);
                });
        }
    };

    useEffect(() => {
        if (countdown === REGISTER_SUCCESS_COUNT_DOWN) {
            intervalIdRef.current = setInterval(() => {
                setCountdown((countdown) => Math.max(0, countdown - 1));
            }, 1000);
        }
        if (countdown === 0) {
            dispatch(clearMessage());
            navigate('/login');
        }
        return () => {
            if (countdown === 0 && intervalIdRef.current) {
                clearInterval(intervalIdRef.current);
            }
        };
    }, [countdown]);

    useEffect(() => {
        return () => {
            intervalIdRef.current && clearInterval(intervalIdRef.current);
        };
    }, []);

    const [successful, setSuccessful] = useState(false);
    return (
        <div>
            <NavBar displaytype={NavBarDisplayType.SECONDARY}/>
            <S.RegisterContainer>
                {!successful && (
                    <form onSubmit={handleRegister} ref={form}>
                        <div className="username-container">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                            />
                        </div>
                        <div className="email-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </div>
                        <div className="pwd-container">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                            />
                        </div>
                        <div className="pwd-confirm-container">
                            <label htmlFor="password-confirm">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password-confirm"
                                value={passwordConfirm}
                                onChange={onChangePasswordConfirm}
                            />
                        </div>
                        <button className="register-btn">Sign up</button>
                    </form>
                )}
                {/* message初始为null */}
                {message && (
                    <div
                        role="alert"
                        className={successful ? 'alert-success' : 'alert-fail'}
                    >
                        {message +
                            (successful
                                ? ` Redirecting to login page...${countdown}`
                                : '')}
                    </div>
                )}
            </S.RegisterContainer>
            <Footer />
        </div>
    );
};

export default Register;
