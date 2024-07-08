import { useSelector } from 'react-redux';
import {
    NavigateFunction,
    useNavigate,
    useLocation,
    Outlet,
    NavLink,
} from 'react-router-dom';
import React, { useEffect } from 'react';

import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

import type { _ReduxState, AuthState } from 'types/states';
import * as S from './style';

interface NotificationsResponsesProps {
    parentMatch?: string;
}

export const NotificationsResponses: React.FC<NotificationsResponsesProps> = ({
    parentMatch,
}) => {
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    const { user } = useSelector<_ReduxState, AuthState>((state) => state.auth);

    useEffect(() => {
        if (user && parentMatch === '') {
            navigate(location.pathname + '/responses');
            return;
        }
    }, [user]);

    return (
        <div className="notifications-responses-container">
            {/* Notifications-Responses */}
        </div>
    );
};

const Notifications = () => {
    const { user } = useSelector<_ReduxState, AuthState>((state) => state.auth);
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate(`/login`);
        }
    }, [user]);

    return (
        user && (
            <div>
                <NavBar displaytype="secondary" />
                <S.NotificationsContainer>
                    <div className="notifications-left-container">
                        <div className="notifications-left-header">
                            <h1>Notifications</h1>
                        </div>
                        <div className="notifications-left-navbar-container">
                            <NavLink to="./responses">Responses</NavLink>
                        </div>
                        <Outlet />
                    </div>
                    <div className="notifications-right-container"></div>
                </S.NotificationsContainer>
                <Footer />
            </div>
        )
    );
};

export default Notifications;
