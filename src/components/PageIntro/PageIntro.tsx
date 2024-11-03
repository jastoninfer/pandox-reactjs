import NavBar from '../NavBar/NavBar';
import Recommend from './Recommend/Recommend';
import * as S from './style';
import Footer from '../Footer';
import { useMemo } from 'react';

const generateStars = (numStars: number) => {
    return Array.from({ length: numStars }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3 
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
            </S.Container>
            <Recommend />
            <Footer />
        </div>
    );
};

export default PageIntro;
