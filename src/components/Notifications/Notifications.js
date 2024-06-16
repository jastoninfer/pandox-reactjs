
import * as S from './style';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export const NotificationsResponses = ({parentMatch}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        if(user && parentMatch === '') {
            navigate(location.pathname + '/responses');
            return;
        }
    }, [user]);

    return (<div className='notifications-responses-container'>
        {/* Notifications-Responses */}
    </div>);
};

const Notifications = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate(`/login`);
        }
    }, [user]);

    return (user && (<div>
        <NavBar displaytype='secondary'/>
        <S.NotificationsContainer>
            <div className='notifications-left-container'>
                <div className='notifications-left-header'>
                    <h1>
                        Notifications
                    </h1>
                </div>
                <div className='notifications-left-navbar-container'>
                    <NavLink to='./responses'>Responses</NavLink>
                </div>
                <Outlet/>
            </div>
            <div className='notifications-right-container'>
            </div>
        </S.NotificationsContainer>
        <Footer/>
    </div>));
}

export default Notifications;