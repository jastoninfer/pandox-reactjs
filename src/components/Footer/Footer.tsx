import * as S from './style';
// import { generateStars } from 'components/PageIntro/PageIntro';
// import * as StartStyle from 'components/PageIntro/style';
import { useMemo } from 'react';

const generateStars = (numStars: number) => {

    return Array.from({ length: numStars }).map((_, index) => ({
      id: index,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 3 
    }));
};

const Footer = () => {
    const stars = useMemo(() => generateStars(10), []);
    return (
        <S.Footer>
            <div className="footer-brand-claim">
                © 2024. Pandox. All Rights Reserved
            </div>
            <div className="footer-links">
                <span>About</span>
                <span>Privacy</span>
                <span>Terms</span>
            </div>
            {stars.map((star) => (
                <S.Star key={star.id} top={star.top} left={star.left} delay={star.delay}>
                </S.Star>
            ))}
        </S.Footer>
    );
};

export default Footer;
