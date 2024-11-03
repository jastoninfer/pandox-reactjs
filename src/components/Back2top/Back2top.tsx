
import { useCallback } from 'react';
import * as S from './style';

const Back2top = () => {

    const back2topOnClick = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <S.Back2top onClick={back2topOnClick}>
            <i className="fa-solid fa-chevron-up"></i>
        </S.Back2top>
    );
};

export default Back2top;