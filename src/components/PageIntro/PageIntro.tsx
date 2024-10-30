import NavBar from '../NavBar/NavBar';
import Recommend from './Recommend/Recommend';
import * as S from './style';
import Footer from '../Footer';
import { useMemo } from 'react';

const generateStars = (numStars: number) => {
    // 生成指定数量的星星，每颗星星有随机的 top、left 和动画延迟
    // console.log('CALLED');
    return Array.from({ length: numStars }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,     // 随机的 top 位置 (0% 到 100%)
      left: Math.random() * 100,    // 随机的 left 位置 (0% 到 100%)
      delay: Math.random() * 3      // 随机的动画延迟 (0 到 3 秒)
    }));
};

const PageIntro = () => {
    const stars = useMemo(()=> generateStars(50),[]);
    return (
        <div>
            <S.Container>
                <NavBar></NavBar>
                <S.Slogan>
                    <S.SubTitle>Empower your code journey</S.SubTitle>
                    <S.Title>
                        On Pandox,
                        <br />
                        Share your insights.
                    </S.Title>
                </S.Slogan>
                {stars.map((star) => (
                    <S.Star key={star.id} top={star.top} left={star.left} delay={star.delay}>
                    </S.Star>
                ))}
                {/* <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div>
                <div className="star"></div> */}
            </S.Container>
            <Recommend />
            <Footer />
        </div>
    );
};

export default PageIntro;
