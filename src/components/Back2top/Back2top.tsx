
import { useCallback } from 'react';
import * as S from './style';

const Back2top = () => {

    const back2topOnClick = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 平滑滚动到顶部
        });
    }, []);

    return (
        <S.Back2top onClick={back2topOnClick}>
            {/* <i className="fa-solid fa-up-long"></i> */}
            {/* <i className="fa-solid fa-angles-up"></i> */}
            <i className="fa-solid fa-chevron-up"></i>
            {/* <span>Back to Top</span> */}
        </S.Back2top>
    );
};

export default Back2top;