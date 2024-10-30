import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const NotificationsContainer = styled.div`
    margin-top: 8vh;
    margin-bottom: 2em;
    min-height: 80vh;
    display: flex;
    div.notifications-left-container {
        flex: 1;
        padding-top: 2.5em;
        padding-left: 1.5em;
        padding-right: 3em;
        div.notifications-left-header {
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
        div.notifications-left-navbar-container {
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
        div.notifications-responses-container {
            color: red;
        }
    }
    div.notifications-right-container {
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
