import styled from 'styled-components';
import theme from '../../commons/style';
// import backgroundImage from '../../static/pexels-brian-de-karma-806590-1686302.jpg';

export const SubTitle = styled.div`
    display: flex;
    text-align: left;
    // justify-content: center;
    align-items: flex-end;
    // padding-left: 10vw;
    // padding-top: 20px;
    // position: relative;
    flex-basis: 30%;
    // background-color:grey;
    // top: 20%;
    // display: block;
    font-size: 2em;
    font-family: 'Baskerville';
    font-weight: normal;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        font-size: 1.6em;
    }
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    // position: relative;
    // top: 50px;
    // margin-top:20px;
    text-align: left;
    margin-top: 7vh;
    // padding-left: 10vw;
    // flex-basis: 40%;
    // flex-grow: 1;
    // display: block;
    font-family: 'Helvetica';
    font-size: 3em;
    font-weight: bold;
    // background-color:green;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        font-size: 2.5em;
    }
`;

export const Slogan = styled.div`
color:white;
    // font-family: 'Helvetica';
    // font-size: 3em;
    // font-weight: bold;
    // position: relative;
    // flex-grow: 1;
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    // height: 460px;
    height: 80%;
    padding-left: 10vw;
    // background-color: lightblue;
    &::before {
        content: '';
        flex-basis: 15%;
        // background-color:blue;
    }
`;

interface StarProps {
    key: Number;
    top: Number;
    left: Number;
    delay: Number;
}

export const Star = styled('div')<StarProps>(({key, top, left, delay}) => `
    position: absolute;
    width: 2px;
    height: 2px;
    background-color: white;
    // border-radius: 50%;
    // box-shadow: 0 0 10px white;
    clip-path: polygon(
        50% 0%,   /* 顶部 */
        60% 40%,  /* 右上角 */
        100% 50%, /* 右边 */
        60% 60%,  /* 右下角 */
        50% 100%, /* 底部 */
        40% 60%,  /* 左下角 */
        0% 50%,   /* 左边 */
        40% 40%   /* 左上角 */
      );
    animation: twinkling 3s infinite ease-in-out;
    @keyframes twinkling {
        0%, 100% {
            opacity: 0.5;
            transform: scale(1);
        }
        50% {
            opacity: 1;
            transform: scale(1.2);
        }
    }
    top: ${top}%;
    left: ${left}%;
    animation-delay: ${delay}s;
`);

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    background-color: black;
    height: max(300px,100vh);
    position: relative;
`;
export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    height: 120px;
    padding-top: 3em;

    color: white;
    gap: 1.2em;
    width: 100%;
    .footer-brand-claim {
        
    }
    .footer-links {
        // padding: .5em;
        // @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        //     align-self: center;
        // }
        display: flex;
        gap: 0.6em;
        font-size: 0.9em;
        span {
            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }

    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        padding-top: 4em;
        .footer-brand-claim {
            align-self: center;
        }
        .footer-links {
            align-self: center;
        }
    }

    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        padding-left: 4em;
        .footer-brand-claim {
            // padding-left: 3em;
        }
        .footer-links {
            // padding-left: 3em;
        }
    }
`;
