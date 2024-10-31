import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const MarkdownEditor = styled.div`
    width: 100%;
    align-self: center;
    textarea {
        overscroll-behavior-y: none;
        border-radius: 5px;
        min-height: 200px;
        // border: 2px solid ${theme.colors.border_grey};
        border: none;
        padding: 10px;
        resize: none;
        width: calc(100% - 20px);
        box-shadow: 0 0 0.2em 0.1em ${theme.colors.border_grey};
        &:focus {
            outline: 0.5px solid ${theme.colors.cadetblue};
        }
    }
    .cm-markdoc-hidden {

    }
    img.cm-widgetBuffer{

    }
    .cm-markdoc-bullet * {
        
    }
      
    .cm-markdoc-bullet::after {
        display: inline !important;
        color: darkgray;
        content: '•';
    }
      
      .cm-markdoc-renderBlock table {
        border-collapse: collapse;
        margin-left: 5px;
      }
      
      .cm-markdoc-renderBlock th,
      .cm-markdoc-renderBlock td {
        border: 1px solid lightgray;
        padding: 5px 10px;
      }

      .cm-markdoc-tag {
        color: darkgray;
      }
    
`;

export const EditorTools = styled.div`
    // padding-left: 1em;
    margin-top: 0.8em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    span {
        color: ${theme.colors.dark_grey};
        min-width: 4rem;
        // font-size: .9rem;
    }
    input.edit-title {
        font-size: 1.1rem;
        border: none;
        border-bottom: .5px solid ${theme.colors.burlywood};
        padding: 5px;
        outline: none;
        color: ${theme.colors.dark_grey};
        width: 70%;
        font-weight: bold;
        @media only screen and (min-width: ${theme.breakpoints.tablet}) {
            width: 60%;
        }
        display: block;
        &:focus {
            border-bottom: 1px solid ${theme.colors.burlywood};
        }
    }
    div.editor-tools-title-container,
    div.editor-tools-status-container {
        display: flex;
        align-items: center;
        gap: 1.3rem;
    }
    .editor-tools-title-container {
        span::after{
            content: '\\00a0\\00a0Title';
        }
    }
    .editor-tools-status-container {
        span::after{
            content: '\\00a0\\00a0Status';
        }
    }

    div.editor-tools-status-container {
        .select-wrapper {
            position: relative;
            
            select {
                min-width: 8rem;
                position: relative;
                outline: none;
                padding: 0.2rem;
                padding-left: .5rem;
                border: 1px solid ${theme.colors.grey};
                border: none;
                border-radius: 0.2em;
                height: 1.8em;
                // text-align:center;

                font-size: 1.1rem;
                cursor: pointer;
                background-color: ${theme.colors.border_grey};
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                color: ${theme.colors.clay_blue};
                color: ${theme.colors.burlywood};
                &:hover {
                    border: 0.5px solid ${theme.colors.clay_blue};
                    outline: 0.5px solid ${theme.colors.clay_blue};
                }
            }
            i{
                color: ${theme.colors.burlywood};
                position: absolute;
                right: 8px;
                top: 50%;
                transform: translateY(-50%);
                pointer-events: none;
            }
        }
    }
`;

export const EditorContainer = styled.div(
    () => `
    width: 90%;
    padding-top: 2rem;
`
);

export const EditContainer = styled.div`
    position: relative;
    margin-top: 8vh;
    margin-bottom: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface EditHeaderContainerProps {
    scroll: string | null;
}

export const EditHeaderContainer = styled.div<EditHeaderContainerProps>(
    ({ scroll }) => `
    @media only screen and (min-width: ${theme.breakpoints.tablet}) {
        min-width: 250px;
    }
    height: 60px;
    display: flex;
    justify-content: flex-begin;
    padding-left: 15px;
    @media only screen and (min-width: ${theme.breakpoints.mobile}) {
        left: 85px;
    }
    z-index: 11;
    div.edit-header {
        // background-color: red;
        width: 90%;
        display: flex;
        gap: 6px;
        height: 100%;
        align-items: center;
        a {
            height: 1.6em;
            line-height:100%;
            font-weight: bold;
            text-decoration: none;
            padding: .3em;
            box-sizing: border-box;
            color: ${theme.colors.grey};
            &.editor-tab-edit{
                &::after{
                    content: ' Edit';
                    @media only screen and (max-width: ${theme.breakpoints.tablet}) {
                        display: none;
                    }
                }
            }
            &.editor-tab-preview{
                &::after{
                    content: '\\00a0\\00a0Preview';
                    @media only screen and (max-width: ${theme.breakpoints.tablet}) {
                        display: none;
                    }
                }
            }
            &:hover {
                color: ${theme.colors.clay_blue};
            }
            &.active {
                background-color: ${theme.colors.border_grey};
                color: ${theme.colors.clay_blue};
                pointer-events: none;
                display: none;
            }
        }
        button.editor-tab-submit {
            color: ${theme.colors.green_blue_dark};
            height: 2.1rem;
            // width: 5em;
            padding: 0.5rem;
            font-weight: bold;
            font-size: 1.0rem;
            cursor: pointer;
            border:none;
            background-color: transparent;
            border-radius: .6rem;
            &:hover {
                color: ${theme.colors.grey_white};
                background-color: ${theme.colors.green_blue_dark};
            }
            &::after{
                content: "\\00a0\\00a0Submit";
                @media only screen and (max-width: ${theme.breakpoints.tablet}) {
                    display: none;
                }
            }
        }
    }
`
);

export const EditorContentLoading = styled.div`
    margin-top: 80px;
    color: ${theme.colors.dark_grey};
    &::before {
        content: 'loading...';
    }
`;

export const TabContentEditor = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
`;
