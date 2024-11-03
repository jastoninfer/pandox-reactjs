import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const SearchBox = styled('div')`
    position: fixed;
    z-index: 101;
    top: 50%;
    left: 50%;
    width: 80vw;
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        width: 650px;
    }
    color: black;
    min-height: 300px;
    border-radius: 8px;
    background-color: ${theme.colors.floralwhite};
    transform: translate(-50%, -50%); /*居中*/
    overflow: scroll;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 10px;
    div.input-search {
        display: flex;
        gap: 0.2em;
        input {
            // background-color: red;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
            height: 30px;
            border: none;
            border-bottom: .5px solid ${theme.colors.dark_grey};
            font-size: 1.1em;
            background-color: ${theme.colors.floralwhite};
            &:focus {
                outline: none;
                border-bottom: 1px solid ${theme.colors.dark_grey};
            }
        }
        button {
            // height: 2.5em;
            min-width: 60px;
            border: none;
            background: none;
            border-radius: 15px;
            padding: 0;
            background-color: ${theme.colors.green_blue};
            color: white;
            height: 2rem;
            &:hover {
                cursor: pointer;
                background-color: ${theme.colors.green_blue_dark};
            }
        }
    }
    .search-suggestions {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .search-suggestions-span {
            // background-color: green;
            font-style: italic;
            color: ${theme.colors.grey};
        }
        .search-results-container {
            display: flex;
            color: ${theme.colors.dark_grey};
            flex-direction: column;
            .search-user-header {
                background-color: ${theme.colors.cadetblue};
            }
            .search-page-header {
                background-color: ${theme.colors.burlywood};
            }
            .search-page-header,
            .search-user-header {
                font-weight: bold;
                color: ${theme.colors.grey_white};
                padding: 3px;
            }
            .search-results-item {
                padding: 2px;
                cursor: pointer;
                &:hover {
                    background-color: ${theme.colors.border_grey};
                }
            }
        }
    }
`;
