import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const LoginContainer = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8vh;
    margin-bottom: 2em;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        padding-top: 6em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        div.username-container,div.pwd-container {
            label {
                display: inline-block;
                width: 6em;
                font-size: 0.9em;
                color: ${theme.colors.dark_grey};
                font-weight: bold;
            }
            input {
                height: 1.5em;
                width: 12em;
                border: none;
                border-bottom: .5px solid ${theme.colors.dark_grey};
                // border-radius: .1em;
                outline: none;
                &:focus {
                    border-bottom: .5px solid transparent;
                    border-radius: .2em;
                    outline: 1px solid ${theme.colors.cadetblue};
                }
            }
        }

        button.login-btn {
            margin-top: 1em;
            width: 7em;
            height: 2.4em;
            align-self: center;
            border: none;
            cursor: pointer;
            border-radius: .2em;
            font-size: .9em;
            color: ${theme.colors.grey_white};
            font-weight: bold;
            background-color: ${theme.colors.clay_blue};
            &:hover{
                background-color: ${theme.colors.clay_blue_dark};
            }
        }
    }
    div.alert-fail {
        // background-color: green;
        font-size: .9em;
        padding: .3em;
        color: ${theme.colors.warning_red};
        // padding-left: 4em;
        // padding-right: 4em;
        // width: 100%;
    }
`;