import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const SearchContainer = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8vh;
    margin-bottom: 2em;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    gap: 0em;
    div.search-error-container {
        h1 {
            font-size: 1.5em;
            padding-top: 2rem;
        }
    }
    div.search-container {
        div.search-header-container {
            padding-top: 1em;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5em;
            h1 {
                max-width: 100%;
                font-size: 1.5em;
                display: inline-block;
                color: ${theme.colors.grey};
                overflow: hidden;
                text-overflow: ellipsis;
                &.search-term {
                    color: ${theme.colors.black};
                }
            }
        }
        div.search-navbar-container {
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
        div.search-pages-container {
            div.search-pageitem-container {
                border-bottom: 1px solid ${theme.colors.border_grey};
                display: flex;
                align-items: center;
                padding-bottom: 1.5em;
                gap: 1em;
                div.search-pageitem-left-container {
                    flex: 1;
                    div.page-item-author-container {
                        display: flex;
                        height: 1.6em;
                        gap: 8px;
                        align-items: center;
                        padding-bottom: 1em;
                        padding-top: 1em;
                        div.page-item-avatar-container {
                            border-radius: 50%;
                            height: 1.2rem;
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
                            font-size: 0.9em;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                    a.page-item-title {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-weight: bold;
                        cursor: pointer;
                        font-size: 1.2em;
                        display: inline-block;
                        margin-bottom: 0.3em;
                    }

                    div.page-item-content {
                        display: -webkit-box;
                        -webkit-line-clamp: 4;
                        max-height: 4.8em;
                        line-height: 1.2em;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        word-break: break-all;
                        text-align: left;
                        color: ${theme.colors.dark_grey};
                        cursor: pointer;
                    }
                }
                div.search-pageitem-right-container {

                    width: 30%;
                    @media only screen and (max-width: ${theme.breakpoints
                            .mobile}) {
                        width: 40%;
                    }
                    padding: 0.6em;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 2em;
                    align-self: flex-end;
                    img {
                        max-width: 100%;
                        height: auto;
                        object-fit: cover;
                    }
                }
            }
        }
        div.search-users-container {
            padding-left: 1em;
            padding-right: 1em;
            div.search-useritem-container {
                display: flex;
                align-items: center;
                gap: 1.3em;
                height: 5em;
                padding-bottom: 0.5em;
                padding-top: 0.5em;
                // background-color: ${theme.colors.floralwhite};
                border-bottom: 1px solid ${theme.colors.border_grey};
                div.search-useritem-avatar-container {
                    border-radius: 50%;
                    height: 50%;
                    flex-shrink: 0;
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
                div.search-useritem-desc-container {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    gap: 0.2em;
                    span {
                        display: block;
                        cursor: pointer;
                        &.search-useritem-username {
                            font-weight: bold;
                        }
                        &.search-useritem-selfintro {
                            color: ${theme.colors.dark_grey};
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            max-height: 2.4em;
                            line-height: 1.2em;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
`;
