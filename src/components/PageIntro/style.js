import styled from 'styled-components';
import theme from '../../commons/style';

export const SubTitle = styled.div`
    display: flex;
    text-align: left;
    // justify-content: center;
    align-items: end;
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

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background:
    linear-gradient(
        // limegreen,
        rgba(80, 219, 53, 0.9),
        transparent
    ),
    linear-gradient(
        90deg,
        // skyblue,
        rgba(71, 196, 237, 0.9),
        transparent
    ),
    linear-gradient(
        -90deg,
        // coral,
        rgba(255, 127, 80, 0.9),
        transparent
    );
    background-blend-mode: screen;
    height: 80vh;
`;
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
        padding-left: 4em;
        .footer-brand-claim {
            // padding-left: 3em;
        }
        .footer-links {
            // padding-left: 3em;
        }
    }
`;