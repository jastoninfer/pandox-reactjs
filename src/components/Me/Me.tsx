import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import type { _ReduxState } from 'types/states';
import type { User_w_Token } from 'types/user';

const Me = () => {
    const user = useSelector<_ReduxState, User_w_Token | null>(
        (state) => state.auth.user
    );
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        if (user) {
            navigate(`/users/@${user.username}`);
        } else {
            navigate(`/login`);
        }
    }, [user]);
    return <div />;
};

export default Me;
