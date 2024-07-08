import styled from 'styled-components';
import theme from '../../commons/style/theme';

export const MarkdownEditor = styled.div`
    width: 100%;
    align-self: center;
    textarea {
        border-radius: 5px;
        min-height: 200px;
        // border: 2px solid ${theme.colors.border_grey};
        border:none;
        padding: 10px;
        resize: none;
        width: calc(100% - 20px);
        box-shadow: 0 0 .2em .1em ${theme.colors.border_grey};
        &:focus{
            outline: .5px solid ${theme.colors.cadetblue};
        }
    }
`;

export const EditorTools = styled.div`
    // padding-left: 1em;
    margin-top: .8em;
    display: flex;
    flex-direction: column;
    gap: 1em;
    span {
        color: ${theme.colors.dark_grey};
        width: 3em;
    }
    input.edit-title {
        font-size: 1.1em;
        border: none;
        border-bottom: 0px solid ${theme.colors.dark_grey};
        padding: 5px;
        outline: none;
        width: 70%;
        font-weight: bold;
        @media only screen and (min-width: ${theme.breakpoints.tablet}) {
            width: 60%;
        }
        display: block;
        &:focus {
            border-bottom: 1px solid ${theme.colors.dark_grey};
        }
    }
    div.editor-tools-title-container, div.editor-tools-status-container{
        display: flex;
        align-items: center;
        gap: 1.6em;
    }

    div.editor-tools-status-container{
        select {
            width: 8em;
            outline: none;
            padding: .2em;
            border: .5px solid ${theme.colors.dark_grey};;
            border-radius: .2em;
            height: 1.8em;
            background-color: ${theme.colors.border_grey};
            font-weight: bold;
            color: ${theme.colors.clay_blue};
            color: ${theme.colors.dark_grey};
            &:hover{
                border: .5px solid ${theme.colors.clay_blue};
                outline: .5px solid ${theme.colors.clay_blue};
            }
        }
    }
`;

export const EditorContainer = styled.div(()=>(`
    // margin-top: 15vh;
    // position: relative;
    width: 90%;
    padding-top: 4.5em;
`));

export const EditContainer = styled.div`
    position: relative;
    margin-top: 8vh;
    margin-bottom: 5em;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

interface EditHeaderContainerProps {
    scroll: string|null;
}

export const EditHeaderContainer = styled.div<EditHeaderContainerProps>(({scroll}) => (`
    width: 100%;
    height: 4.5em;
    display: flex;
    justify-content: center;
    background-color: ${theme.colors.white};
    position: ${scroll&&scroll==='up' ? 'fixed' : 'absolute'};
    top: ${scroll&&scroll==='up' ? '8vh' : '0'};
    transition: top 0.2s ease;
    box-shadow: 0 8px 10px -5px ${theme.colors.border_grey};
    z-index: 10;
    div.edit-header {
        width: 90%;
        display: flex;
        gap: 1em;
        border-bottom: .5px solid ${theme.colors.border_grey};
        height: 100%;
        align-items: center;
        a {
            display: inline-flex;
            height: 1.6em;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            text-decoration: none;
            padding: .3em;
            border-radius: .2em;
            color: ${theme.colors.grey};
            &:hover {
                outline: 1px solid ${theme.colors.dark_grey};
            }
            &.active {
                background-color: ${theme.colors.border_grey};
                color: ${theme.colors.clay_blue};
                pointer-events: none;
            }
        }
        button.editor-tab-submit {
            color: ${theme.colors.grey_white};
            // margin-left: auto;
            // margin-right: auto;
            margin-left: 4.5em;
            height: 2.3em;
            width: 5em;
            padding: .5em;
            align-self: center;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            cursor: pointer;
            // border: 0px solid ${theme.colors.dark_grey};
            border: none;
            // background-color: transparent;
            border-radius: 2em;
            background-color: ${theme.colors.clay_blue};
            &:hover {
                color: ${theme.colors.grey_white};
                background-color: ${theme.colors.clay_blue_dark};
                // outline: 0px solid ${theme.colors.dark_grey};
            }
        }
    }
`));

export const EditorContentLoading = styled.div`
    margin-top: 8vh;
    color: ${theme.colors.dark_grey};
    &::before {
        content: "loading...";
    }
`;

export const TabContentEditor = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2.5em;
`;