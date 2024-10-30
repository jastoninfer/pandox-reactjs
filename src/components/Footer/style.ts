import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    height: 120px;
    padding-top: 3em;
    position: relative;
    background-color: ${theme.colors.dark_grey};
    background-color: #2e2e2e;
    background-color: black;
    // padding-left: 3em;
    // padding-top: 2em;
    // justify-content: space-around;
    // align-items: center;
    color: white;
    gap: 1.2em;
    width: 100%;
    .footer-brand-claim {
        // font-size: 0.9em;
        // width: 300px;
        // margin: 0 auto;
        // padding: 1em;
        // padding-left: 3em;
        // @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        //     align-self: center;
        // }
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

    @media only screen and (max-width: ${theme.breakpoints.tablet}) {
        padding-top: 3rem;
        height: 150px;
        .footer-brand-claim {
            align-self: center;
            // background-color: green;
        }
        .footer-links {
            align-self: center;
            // background-color: red;
        }
    }

    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        box-sizing: border-box;
        padding-left: 4em;
        height: 150px;
        .footer-brand-claim {
            // background-color: blue;
            // padding-left: 3em;
        }
        .footer-links {
            // padding-left: 3em;
        }
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