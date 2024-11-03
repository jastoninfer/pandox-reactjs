import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const SettingsContainer = styled.div`
    margin-top: 8vh;
    margin-bottom: 2em;
    min-height: 80vh;
    display: flex;

    div.overlay-dark {
        background-color: rgba(0, 0, 0, 0.5);
    }
    div.settings-left-container {
        flex: 1;
        padding-top: 2.5em;
        padding-left: 1.5em;
        padding-right: 3em;
        div.profile-left-header {
            display: flex;
            align-items: center;
            gap: 1.2em;
            h1 {
                display: inline-block;
                font-size: 2.6em;
                @media only screen and (max-width: ${theme.breakpoints
                        .tablet}) {
                    font-size: 1.6em;
                }
            }
        }
        div.settings-left-navbar-container {
            display: flex;
            gap: 1.5em;
            height: 2em;
            border-bottom: 1px solid ${theme.colors.border_grey};
            margin-bottom: 1em;
            margin-top: 1em;
            a {
                display: inline-block;
                color: ${theme.colors.grey};
                text-decoration: none;
                &:hover {
                    color: ${theme.colors.black};
                }
                &.active {
                    color: ${theme.colors.black};
                    position: relative;
                    z-index: 1;
                    &::after {
                        content: '';
                        position: absolute;
                        bottom: -1px;
                        left: 0;
                        right: 0;
                        height: 1px;
                        background: ${theme.colors.black};
                    }
                }
            }
        }
        div.settings-account-container {
            display: flex;
            flex-direction: column;
            gap: 0.8em;
            div.popup-window {
                position: fixed;
                z-index: 101;
                top: 50%;
                left: 50%;
                width: 80vw;
                cursor: default;
                font-size: 0.95em;
                @media only screen and (min-width: ${theme.breakpoints
                        .tablet}) {
                    width: 500px;
                }
                min-height: 300px;
                border-radius: 5px;
                background-color: ${theme.colors.white};
                transform: translate(-50%, -50%); /*居中*/
                overflow: scroll;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px 30px;
                gap: 2em;
                span.popup-window-header {
                    font-weight: bold;
                    font-size: 1.1em;
                    padding-top: 1em;
                }
                div.popup-window-avatarinfo-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;
                    align-items: flex-start;
                    color: ${theme.colors.grey};
                    span {
                    }
                    div.popup-window-avatarrow-container {
                        width: 100%;
                        display: flex;
                        div.popup-window-avatarrow-left-container {
                            border-radius: 50%;
                            height: 4.5em;
                            aspect-ratio: 1/1;
                            overflow: hidden;
                            border: 1px solid ${theme.colors.clay_blue};
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }
                        div.popup-window-avatarrow-right-container {
                            flex: 1;
                            margin-left: 1.5em;
                            display: flex;
                            justify-content: space-evenly;
                            flex-direction: column;
                            div.popup-window-avatarrow-right-btns-container {
                                display: flex;
                                gap: 0.5em;
                                span {
                                    &:hover {
                                        cursor: pointer;
                                    }
                                    &.update {
                                        color: ${theme.colors.cadetblue};
                                    }
                                    &.remove {
                                        color: ${theme.colors.warning_red};
                                    }
                                }
                            }
                            div.popup-window-avatarrow-right-desc-container {
                            }

                            input.popup-window-avatar-uploadfile {
                                display: none;
                                color: green;
                            }
                        }
                    }
                }
                div.popup-window-selfintro-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5em;
                    span {
                    }
                    textarea {
                        font-size: .9rem;
                        height: 5rem;
                        resize: none;
                        border: none;
                        border-radius: 0.2em;
                        background-color: ${theme.colors.border_grey};
                        padding: 10px;
                        &:focus {
                            background-color: ${theme.colors.grey_white};
                            outline: 1px solid ${theme.colors.black};
                        }
                    }
                }

                div.popup-window-border {
                    width: 100%;
                    height: 1px;
                    background-color: ${theme.colors.border_grey};
                }

                div.popup-window-bottom-container {
                    // background-color: blue;
                    height: 2.5rem;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: flex-end;
                    div.popup-window-bottom-btns-container {
                        display: flex;
                        gap: 1em;
                        button {
                            min-width: 5rem;
                            height: 2.3rem;
                            border: none;
                            background: none;
                            border-radius: 2rem;
                            &:hover {
                                cursor: pointer;
                            }
                            &.cancel {
                                border: 1px solid ${theme.colors.clay_blue};
                                color: ${theme.colors.clay_blue};
                            }
                            &.save {
                                // font-size: 1rem;
                                color: ${theme.colors.white};
                                background-color: ${theme.colors.clay_blue};
                                &:hover {
                                    background-color: ${theme.colors
                                        .clay_blue_dark};
                                }
                            }
                        }
                    }
                }
            }

            div.settings-accountitem-container {
                display: flex;
                align-items: center;
                cursor: pointer;
                min-height: 2.5em;
                font-size: 0.95em;

                div.settings-accountitem-left-container {
                    &.settings-accountitem-warning {
                        color: ${theme.colors.warning_red};
                    }
                }
                div.settings-accountitem-right-container {
                    display: flex;
                    align-items: center;
                    gap: 0.6em;
                    margin-left: auto;
                    color: ${theme.colors.grey};
                    div.settings-accountitem-avatar-container {
                        border-radius: 50%;
                        height: 1.7em;
                        aspect-ratio: 1/1;
                        overflow: hidden;
                        border: 1px solid ${theme.colors.clay_blue};
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }
                }
                &:hover {
                    div.settings-accountitem-right-container {
                        color: ${theme.colors.black};
                    }
                }
            }

            div.settings-accountitem-border {
                height: 1px;
                margin-top: 1em;
                margin-bottom: 1em;
                background-color: ${theme.colors.border_grey};
            }
        }
    }
    div.settings-right-container {
        flex: 0 0 16em;
        padding-left: 2em;
        padding-top: 3em;
        margin-left: auto;
        border-left: 1px solid ${theme.colors.border_grey};
        @media only screen and (max-width: ${theme.breakpoints.tablet}) {
            display: none;
        }
    }
`;
