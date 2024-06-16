import styled from 'styled-components';
import theme from '../../commons/style';

export const BlogMain = styled.div`
    width: 90%;
    margin: auto auto;
    margin-top: 15vh;
    display: flex;
    flex-direction: column;
    // display: flex;
    // flex-direction: column;

    .BlogMainAlert {
        background-color: antiquewhite;
        padding: 0.5em;
        font-size: .9em;
        // color: ${theme.colors.dark_grey};
    }

    .BlogTitleLabel {
        display: flex;
        flex-direction: column;
        gap: .3em;
        .BlogTitleLabelDates {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            .Blog-Title-Label-Date {
                font-size: 14px;
                margin-left: 4px;
                margin-right: 4px;
            }
        }
        .BlogTitleLabelKeywords {
            display: flex;
            .Title-Label-Button {
                display: inline-block;
                background-color: #33dab6;
                margin: 3px 3px;
                padding: 2px 2px;
                font-size: 14px;
                &:first-of-type {
                    background-color: transparent;
                    font-style: italic;
                }
            }
        }
    }

    .BlogAuthorInfoBar {
        display: flex;
        align-items: center;
        height: 45px;
        margin-top: 1.5em;
        .Avatar-Container {
            height: 70%;
            border-radius: 50%;
            overflow: hidden;
            aspect-ratio: 1/1;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            border: 1px solid ${theme.colors.clay_blue};
        }
        .BlogAutherInfoUsername {
            margin-left: 12px;
            font-weight: bold;
            &:hover{
                color: ${theme.colors.dark_grey};
                cursor: pointer;
            }
        }
    }

    .BlogContentContainer {
        display: flex;
        width: 100%;
        min-height: 10em;
        margin-bottom: 2em;
        margin-top: .5em;
        #BlogContent {
            width: 75%;
            flex-grow: 1;
            padding-left: .5em;
            padding-right: .5em;
            &>p {
                font-family: Geneva, Calibri, sans-serif;
                line-height: 1.5em;
                margin-bottom: .5em;
            }
        }
    }

    #BlogTableofContentsContainer {
        // background-color: bisque;
        // display: none;
        @media only screen and (max-width: ${theme.breakpoints.desktop}) {
            display: none;
        }
        border-left: .5px solid ${theme.colors.border_grey};
        margin-left: 1em;
        padding-left: 1em;
        width: 250px;
        height: auto;
        font-family: Geneva, Calibri, sans-serif;
        position: relative;
        font-size: 1.2em;
        #Toc-Title {
            display: none;
            font-size: 1.1em;
            // font-weight: bold;
            color: ${theme.colors.dark_grey};
        }
        #BlogTableofContents {
            box-sizing: border-box;
            padding: .5em;
            &.normal {
                // background-color: green;
                position: inherit;
            }
            &.restore {
                position: absolute;
                bottom: 0;
            }
            &.sticky {
                position: fixed;
                top: 10vh;
            }
            a {
                overflow-wrap: break-word;
                text-decoration: none;
                color: ${theme.colors.dark_grey};
                &:hover{
                    // text-decoration: underline;
                    color: black;
                }
            }
            ul, ol {
                list-style: none;
            }
            &>ul {
                font-size: 0.9em;
                padding-left: 0px;
            }
            &>ul ul {
                padding-left: 1.3em;
            }
            &>ul>li>a {
               display: block;
               margin-bottom: .3em; 
            }
        }
    }
    #BlogOpsContainer {
        align-self: flex-end;
        margin-right: 1em;
        display: flex;
        gap: .3em;
        button {
            font-size: .9em;
            background-color: transparent;
            border: none;
            border-radius: .2em;
            color: ${theme.colors.dark_grey};
            &:hover{
                cursor: pointer;
                // background-color: ${theme.colors.border_grey};
                color: ${theme.colors.clay_blue};
                text-decoration: underline;
            }
        }
        // flex-direction: column;
    }
`;
