import { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Recommend from './Recommend/Recommend';
import * as S from './style';
import Footer from '../Footer';
// import Inputx from 'react-validation/build/input';
// import Form from 'react-validation/build/form';
// import Textarea from 'react-validation/build/textarea';
// import Button from 'react-validation/build/button';
// import Select from 'react-validation/build/select';
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
            <Recommend>
            </Recommend>
            <Footer/>

            {/* <div id='slogan'>
                Empower Your Code Journey: Share Your Insights on Pandox.
            </div> */}
            {/* <span>Empower Your Code Journey: Share Your Insights on Pandox.</span> */}
        </div>
    );
}

export default PageIntro;