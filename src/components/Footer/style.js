import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const Footer = styled.div`
    display: flex;
    flex-direction: column;
    height: 120px;
    padding-top: 3em;
    background-color: ${theme.colors.dark_grey};
    background-color: #2e2e2e;
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
    .footer-links{
        // padding: .5em;
        // @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        //     align-self: center;
        // }
        display: flex;
        gap: .6em;
        font-size: 0.9em;
        span {
            &:hover{
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
        box-sizing: border-box;
        padding-left: 4em;
        height: 145px;
        .footer-brand-claim {
            // padding-left: 3em;
        }
        .footer-links {
            // padding-left: 3em;
        }
    }
`;