import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const RegisterContainer = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8vh;
    margin-bottom: 2em;
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2em;
    form {
        padding-top: 6em;
        display: flex;
        flex-direction: column;
        gap: 1em;
        div.username-container,
        div.email-container,
        div.pwd-container,
        div.pwd-confirm-container {
            label {
                display: inline-block;
                width: 7em;
                font-size: 0.9em;
                color: ${theme.colors.dark_grey};
                font-weight: bold;
            }
            input {
                height: 1.5em;
                width: 15em;
                border: none;
                border-bottom: 0.5px solid ${theme.colors.dark_grey};
                // border-radius: .1em;
                outline: none;
                &:focus {
                    border-bottom: 1px solid ${theme.colors.dark_grey};
                }
            }
        }
        button.register-btn {
            margin-top: 1em;
            width: 7em;
            height: 2.4em;
            align-self: center;
            border: none;
            cursor: pointer;
            border-radius: 0.2em;
            font-size: 0.9em;
            color: ${theme.colors.grey_white};
            font-weight: bold;
            background-color: #e2912a;
            &:hover {
                background-color: #de8a1e;
            }
        }
    }
    div.alert-success,
    div.alert-fail {
        font-size: 0.9em;
        padding: 0.3em;
    }
    div.alert-fail {
        color: ${theme.colors.warning_red};
    }
    div.alert-success {
        wdith: 100%;
        margin-top: 3em;
        color: ${theme.colors.burlywood};
    }
`;
