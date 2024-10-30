import styled from 'styled-components';
import theme from '../../commons/style';

export const ProfileContainer = styled.div`
    margin-top: 8vh;
    margin-bottom: 2em;
    // width: 100%;
    // padding-top: 3em;
    // min-height: 70vh;
    // height: 100vh;
    div.profile-error-container {
        min-height: 70vh;
        padding-top: 3em;
        padding-left: 1.5em;
        h1 {
            font-size: 1.5em;
        }
    }

    div.profile-container {
        // width: 100vw;
        width: 100%;
        height: 100%;
        display: flex;
    }

    div.profile-left-container {
        // width: 70%;
        // flex-basis: 70%;
        // flex-grow: 1;
        flex: 1;
        padding-top: 2.5em;
        padding-left: 1.5em;
        padding-right: 1.5em;
        min-height: 70vh;
        div.profile-left-header {
            display: flex;
            align-items: center;
            gap: 1.2em;
            div.profile-left-header-avatar-container {
                display: inline-block;
                // background-color: green;
                border-radius: 50%;
                height: 3em;
                aspect-ratio: 1/1;
                overflow: hidden;
                border: 1px solid ${theme.colors.burlywood};
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    cursor: pointer;
                }
                @media only screen and (min-width: ${theme.breakpoints
                        .tablet}) {
                    display: none;
                }
            }
            h1 {
                display: inline-block;
                font-size: 2.6em;
                @media only screen and (max-width: ${theme.breakpoints
                        .tablet}) {
                    font-size: 1.6em;
                }
            }
        }
        div.profile-left-navbar-container {
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
        div.profile-blogs-container {
            div.profile-blogitem-container {
                display: flex;
                gap: 1.3em;
                border-bottom: 1px solid ${theme.colors.border_grey};
                // height: 5em;
                padding-top: 0.5em;
                padding-bottom: 1.5em;
                div.profile-blogitem-left-container {
                    flex: 1;
                    div.blogitem-author-container {
                        display: flex;
                        height: 3.6em;
                        // background-color: red;
                        gap: 8px;
                        align-items: center;
                        padding-bottom: 1em;
                        padding-top: 1em;
                        div.blogitem-avatar-container {
                            background-color: green;
                            border-radius: 50%;
                            height: 80%;
                            aspect-ratio: 1/1;
                            overflow: hidden;
                            border: 1px solid ${theme.colors.burlywood};
                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                cursor: pointer;
                            }
                        }
                        span {
                            cursor: pointer;
                            font-size: 0.9rem;
                            &:hover {
                                text-decoration: underline;
                                color: ${theme.colors.dark_grey};
                            }
                        }
                    }
                    div.blogitem-title-container {
                        display: flex;
                        align-items: center;
                        gap: 0.6em;
                        margin-bottom: 0.3em;
                        span {
                            display: inline-block;
                            // color: red;
                            font-size: 0.8em;
                            background-color: ${theme.colors.clay_blue};
                            border-radius: 0.2em;
                            padding: 0.2em;
                            padding-left: 0.3em;
                            padding-right: 0.3em;
                            color: ${theme.colors.white};
                            &.published {
                                background-color: ${theme.colors.burlywood};
                            }
                            &.draft {
                                background-color: ${theme.colors.grey};
                            }
                            // align-self: flex-start;
                        }
                        a {
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-weight: bold;
                            cursor: pointer;
                            font-size: 1.2em;
                            display: inline-block;
                        }
                    }
                    div.blogitem-content {
                        // width: 100%;
                        // box-sizing: border-box;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        max-height: 4.8em;
                        line-height: 1.2em;
                        -webkit-box-orient: vertical;
                        word-break: break-all;
                        overflow: hidden;
                        // padding-left: .5em;
                        text-align: left;
                        color: ${theme.colors.dark_grey};
                        cursor: pointer;
                    }
                }
                div.profile-blogitem-right-container {
                    display: flex;
                    // width: 30%;
                    width: 30%;
                    @media only screen and (max-width: ${theme.breakpoints
                            .mobile}) {
                        width: 40%;
                    }
                    justify-content: center;
                    align-items: center;
                    align-self: flex-end;
                    margin-top: 2em;
                    // border: 1px solid ${theme.colors.border_grey};
                    border-radius: 0.3em;
                    padding: 0.6em;
                    overflow: hidden;
                    max-height: 150px;
                    img {
                        max-width: 100%;
                        height: auto;
                        object-fit: cover;
                        object-position: center;
                        // max-height: 50px;
                    }
                }
            }
        }
    }

    div.profile-right-container {
        // flex-basis: 30%;
        // flex-basis: 20em;
        // width: 25em;
        min-height: 70vh;
        flex: 0 0 20em;
        padding-left: 2em;
        padding-top: 3em;
        margin-left: auto;
        border-left: 1px solid ${theme.colors.border_grey};
        // flex-grow: 1;
        // background-color: ${theme.colors.floralwhite};
        @media only screen and (max-width: ${theme.breakpoints.tablet}) {
            display: none;
        }
        div.profile-right-avatar-container {
            // background-color: green;
            border-radius: 50%;
            width: 30%;
            aspect-ratio: 1/1;
            overflow: hidden;
            border: 2px solid ${theme.colors.burlywood};
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                cursor: pointer;
            }
        }

        span.profile-right-username {
            display: block;
            font-weight: bold;
            margin-top: 1em;
        }

        a.profile-right-edit-profile {
            display: block;
            margin-top: 1em;
            cursor: pointer;
            color: ${theme.colors.cadetblue};
            font-size: 0.9em;
            &:hover {
                color: ${theme.colors.dark_grey};
            }
        }
    }
`;
