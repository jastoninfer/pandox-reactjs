import NavBar from '../NavBar/NavBar';
import Recommend from './Recommend/Recommend';
import * as S from './style';
import Footer from '../Footer';

const PageIntro = () => {
    return (
        <div>
            <S.Container>
                <NavBar></NavBar>
                <S.Slogan>
                    <S.SubTitle>
                        Empower your code journey
                    </S.SubTitle>
                    <S.Title>
                        On Pandox,
                        <br/>
                        Share your insights.
                    </S.Title>
                </S.Slogan>
            </S.Container>
            <Recommend/>
            <Footer/>
        </div>
    );
}

export default PageIntro;