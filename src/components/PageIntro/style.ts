import styled from 'styled-components';
import theme from '../../commons/style';
// import backgroundImage from '../../static/pexels-brian-de-karma-806590-1686302.jpg';

export const SubTitle = styled.div`
    display: flex;
    text-align: left;
    // justify-content: center;
    align-items: flex-end;
    flex-basis: 30%;
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
    text-align: left;
    margin-top: 7vh;
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
    display: flex;
    flex-direction: column;
    height: 80%;
    padding-left: 10vw;
    &::before {
        content: '';
        flex-basis: 15%;
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
    clip-path: polygon(
        50% 0%,
        60% 40%,
        100% 50%,
        60% 60%,
        50% 100%,
        40% 60%,
        0% 50%,
        40% 40%
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
        }
        .footer-links {
        }
    }
`;
