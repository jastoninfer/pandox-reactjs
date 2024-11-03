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

    @media only screen and (max-width: ${theme.breakpoints.tablet}) {
        padding-top: 3rem;
        height: 150px;
        .footer-brand-claim {
            align-self: center;
        }
        .footer-links {
            align-self: center;
        }
    }

    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        box-sizing: border-box;
        padding-left: 4em;
        height: 150px;
        .footer-brand-claim {
        }
        .footer-links {
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