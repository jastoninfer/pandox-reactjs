import * as S from './style';

const Footer = () => {
    return (
        <S.Footer>
                <div className='footer-brand-claim'>
                    © 2024. Pandox. All Rights Reserved
                </div>
                <div className='footer-links'>
                    <span>About</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                </div>
                {/* <br></br>
                <button>About</button>
                <button>Privacy</button>
                <button>Terms</button> */}
        </S.Footer>
    );
};

export default Footer;