import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Me = () => {
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(user) {
            navigate(`/users/@${user.username}`);
        } else {
            navigate(`/login`);
        }
    }, [user]);
    return (<div/>);
};

export default Me;