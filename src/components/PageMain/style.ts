import styled from 'styled-components';
import theme from '../../commons/style';

interface BlogMainProps {
    heading_len: number;
}

export const BlogMain = styled('div')<BlogMainProps>(
    ({ heading_len }) => `
    width: 90%;
    margin: auto auto;
    margin-top: 15vh;
    display: flex;
    flex-direction: column;

    .BlogMainAlert {
        background-color: antiquewhite;
        padding: 0.5em;
        font-size: 0.9em;
    }

    .BlogTitleLabel {
        display: flex;
        flex-direction: column;
        gap: 0.3em;
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
            flex-wrap: wrap;
            .Title-Label-Button {
                display: inline-block;
                text-decoration: underline;
                margin: 3px 3px;
                padding: 2px 2px;
                font-size: 14px;
                &:hover{
                    cursor: pointer;
                }
                &:first-of-type {
                    background-color: transparent;
                    font-style: italic;
                    text-decoration: none;
                    &:hover{
                        cursor: default;
                    }
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
            border: 1px solid ${theme.colors.burlywood};
        }
        .BlogAutherInfoUsername {
            margin-left: 12px;
            font-weight: bold;
            &:hover {
                color: ${theme.colors.dark_grey};
                cursor: pointer;
            }
        }
    }

    .BlogContentContainer {
        overflow:hidden;
        display: flex;
        margin-bottom: 2em;
        margin-top: 0.5em;
        position: relative;
        .BlogContentInnerContainer{
            position: relative;
            flex-basis: 50%;
            overflow:hidden;
            flex-grow: 1;
            #BlogBack2topContainer{
                widht: 4rem;
                height: 3rem;
                &.xnormal{
                    display: none;
                }
                &.xsticky {
                    position: fixed;
                }
            }
        }

        #BlogContent { 
            & > p {
                font-family: Geneva, Calibri, sans-serif;
                line-height: 1.5em;
                margin-bottom: 0.5em;
            }
            img{
                max-width: 80%;
            }
            
        }
        
    }

    #BlogTableofContentsContainer {
        flex-basis: 250px;
        flex-shrink: 0;
        flex-grow: 0;
        box-sizing: border-box;
        display: ${heading_len > 0 && 'block' || 'none'};
        @media only screen and (max-width: ${theme.breakpoints.desktop}) {
            display: none;
        }
        // border-left: 0.5px solid ${theme.colors.border_grey};
        margin-left: 2rem;
        height: auto;
        font-family: Geneva, Calibri, sans-serif;
        position: relative;
        font-size: 1.2em;
        #Toc-Title {
            font-size: 1.1em;
            color: ${theme.colors.dark_grey};
        }
        #BlogTableofContents {
            padding: 0.5rem;
            padding-left: 0;
            // overflow: scroll;
            &.normal {
                position: inherit;
            }
            &.restore {
                position: absolute;
                bottom: 0;
            }
            &.sticky {
                position: fixed;
                top: 100px;
                width:250px;
            }
            div#Toc-Title{
                padding-left: 0rem;
                font-size: 1.1rem;
            }
            a {
                font-size: .9rem;
                overflow-wrap: break-word;
                text-decoration: none;
                color: ${theme.colors.dark_grey};
                &:hover {
                    color: black;
                }
                &.selected {
                    margin-left: -2px;
                    background-color: green;
                    border-left: rgba(71, 196, 237, .9) 2px solid;
                    background-color: rgba(71, 196, 237, .3);
                    font-weight: bold;
                }
            }
            ul,
            ol {
                list-style: none;
            }
            & > ul {
                border-left: ${theme.colors.border_grey} 2px solid;
                font-size: 0.9em;
                padding-left: 0px;
                a {
                    padding-left: 0.5rem;
                    padding-top: .2rem;
                    padding-bottom: .2rem;
                    padding-right: 1rem;
                    display: inline-block;
                }
            }
            & > ul ul {
                padding-left: 0em;
                a {
                    padding-left: 1.8rem;
                }
            }
            & > ul > li > a {
                display: block;
                margin-bottom: 0.3rem;
            }
        }
    }
    #BlogOpsContainer {
        align-self: flex-end;
        margin-right: 1em;
        display: flex;
        gap: 0.8rem;
        button {
            font-size: 1.1rem;
            background-color: transparent;
            border: none;
            border-radius: 0.2em;
            color: ${theme.colors.dark_grey};
            &:hover {
                cursor: pointer;
                color: ${theme.colors.clay_blue};
            }
        }
        button.BlogOpsLike{
            &:hover {
                color: ${theme.colors.love_red};
            }
        }
        button.BlogOpsButtonComment{
            &:hover{
                color: ${theme.colors.green_blue}
            }
        }
    }
`
);
