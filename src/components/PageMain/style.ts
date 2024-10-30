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
    // position: relative;
    // display: flex;
    // flex-direction: column;

    .BlogMainAlert {
        background-color: antiquewhite;
        padding: 0.5em;
        font-size: 0.9em;
        // color: ${theme.colors.dark_grey};
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
            .Title-Label-Button {
                display: inline-block;
                // background-color: #33dab6;
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
            border: 1px solid ${theme.colors.clay_blue};
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
        display: flex;
        width: 100%;
        // min-height: 10rem;
        margin-bottom: 2em;
        margin-top: 0.5em;
        position: relative;
        .BlogContentInnerContainer{
            position: relative;
            width: 75%;
            flex-grow: 1;
            #BlogBack2topContainer{
                // width: 5rem;
                // width: 100px;
                // height: 100px;
                // min-width: 10rem;
                height: 3rem;
                // background-color: green;
                // color: red;
                // z-index:9999;
                &.xnormal{
                    position: absolute;
                    bottom: 0;
                    // right: 0;
                    right: 0;
                    display: none;
                }
                &.xsticky {
                    position: fixed;
                    top: 100px;
                    right: 0;
                    // right: 0;
                }
                // display: none;
            }
        }

        #BlogContent {
            // width: 75%;
            // flex-grow: 1;
            // width:100%;
            // box-sizing: border-box;
            // padding-left: 1rem;
            padding-right: 4rem;
            // max-width:100%;
            // margin-right: 5rem;
            // margin-left:auto;
            // margin-right:auto;
            
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
        // background-color: red;
        box-sizing: border-box;
        // display: none;
        display: ${heading_len > 0 && 'block' || 'none'};
        @media only screen and (max-width: ${theme.breakpoints.desktop}) {
            display: none;
        }
        // border-left: 0.5px solid ${theme.colors.border_grey};
        margin-left: 2rem;
        // padding-left: 1rem;
        // width: 250px;
        height: auto;
        font-family: Geneva, Calibri, sans-serif;
        position: relative;
        font-size: 1.2em;
        #Toc-Title {
            // display: none;
            font-size: 1.1em;
            // font-weight: bold;
            color: ${theme.colors.dark_grey};
        }
        #BlogTableofContents {
            // box-sizing: border-box;
            padding: 0.5rem;
            padding-left: 0;
            &.normal {
                // background-color: purple;
                position: inherit;
            }
            &.restore {
                // background-color: blue;
                position: absolute;
                bottom: 0;
            }
            &.sticky {
                // background-color: bisque;
                position: fixed;
                top: 100px;
                width:250px;
            }
            div#Toc-Title{
                // background-color:yellow;
                padding-left: 0rem;
                font-size: 1.1rem;
            }
            a {
                font-size: .9rem;
                // display:none;
                // width:100%;
                // background-color: yellow;
                overflow-wrap: break-word;
                text-decoration: none;
                color: ${theme.colors.dark_grey};
                &:hover {
                    // text-decoration: underline;
                    color: black;
                }
                // background-color:green;
                // border-left: ${theme.colors.border_grey} 2px solid;
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
                // background-color:green;
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
                // background-color:red;
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
                // background-color: ${theme.colors.border_grey};
                color: ${theme.colors.clay_blue};
                // text-decoration: underline;
            }
        }
        button.BlogOpsLike{
            // color: green;
            &:hover {
                color: ${theme.colors.love_red};
                // color: red;
            }
        }
        button.BlogOpsButtonComment{
            &:hover{
                color: ${theme.colors.green_blue}
            }
        }
        // flex-direction: column;
    }
`
);
