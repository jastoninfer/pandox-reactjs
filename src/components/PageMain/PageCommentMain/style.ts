import styled from 'styled-components';
import theme from '../../../commons/style';

export const BlogCommentBody = styled.div`
    margin-top: 20px;
    padding-top: 1em;
    border-top: ${theme.colors.border_grey} 1px solid;
    // padding: 20px;
    p {
        padding-bottom: 0.5em;
    }
    padding-bottom: 2em;
`;

interface AvatarContainerProps {
    displaytype?: string;
}

export const AvatarContainer = styled('div')<AvatarContainerProps>(
    ({ displaytype }) => `
    width: ${displaytype === 'subcomment' ? '20px' : '25px'};
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        &:hover{
            cursor: pointer;
        }
    }
    border: 1px solid ${theme.colors.burlywood};
`
);

export const BlogCommentItem = styled.div`
    border: 1px solid ${theme.colors.border_grey};
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
    padding-bottom: 0.3em;
    border-radius: 0.3em;
    // background-color: lightgrey;
    .Blog-Comment-Item-Header {
        display: flex;
        align-items: center;
        background-color: ${theme.colors.floralwhite};
        // background: linear-gradient(to right,#d5f4fd, white);
        padding: 0.5em;
        // padding-bottom: 0em;
        // margin-bottom: 0em;
        .Blog-Comment-Username {
            margin-left: 10px;
            // font-size: 14px;
            font-size: 0.9em;
            &.Thread-Owner{
                font-weight: bold;
                color: ${theme.colors.dark_grey};
            }
            &:hover{
                color: ${theme.colors.clay_blue};
                cursor: pointer;
            }
        }
    }

    .comment-tools {
        display: flex;
        font-size: 0.9em;
        // flex-direction: column;
        flex-wrap: wrap;
        // gap: .6em;
        // justify-content: flex-end;
        // align-items: center;
        color: ${theme.colors.dark_grey};
        span.comment-date {
            color: ${theme.colors.grey};
            font-size: 0.85em;
            // margin-left: 1em;
            // align-self: flex-start;
        }
        div.comment-tools-ops {
            display: inline-flex;
            // width: 400px;
            gap: 1.0rem;
            margin-left: auto;
            // margin-right: 2em;
            justify-content: flex-end;
            a {
                &:hover{
                    color: ${theme.colors.clay_blue};
                }
            }
            a.hide-replies {
            }
            a.view-replies {
            }
            a.delete-comment {
                &:hover {
                    color: ${theme.colors.warning_red};
                }
            }
        }

        a:hover {
            cursor: pointer;
            color: ${theme.colors.black};
        }
    }

    .Blog-Comment-Item-Body {
        // background-color:bisque;
        padding-left: 1.6em;
        // border: #282c34 2px solid;
        padding-right: 1em;
    }
`;

interface ReplyBoxProps {
    displaytype: string;
}

export const ReplyBox = styled('div')<ReplyBoxProps>(
    ({ displaytype }) => `
    display: flex;
    margin-top: .3em;
    gap: .3em;
    flex-direction: column;
    font-size: 0.9em;
    margin-left: ${displaytype === 'subcomment' ? '24px' : '0px'};
    width: 76%;
    @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        width: calc(100% - ${displaytype === 'subcomment' ? '24px' : '0px'});
    }
    textarea{
        height: ${displaytype === 'subcomment' ? '5em' : '10em'};
        overflow: scroll;
        border: .5px solid ${theme.colors.dark_grey};
        border-radius: 0.2em;
        text-align: top;
        resize: none;
        &:focus{
            outline: none;
        }
        padding: .5rem;
    }
    div.reply-box-ops {
        display: flex;
        justify-content: flex-end;
        gap: .5rem;
        button {
            height: 1.2rem;
            width: 2rem;
            background-color: transparent;
            border: .5px solid ${theme.colors.dark_grey};
            border-radius: .2em;
            color: ${theme.colors.dark_grey};
            &:hover{
                cursor: pointer;
                background-color: ${theme.colors.border_grey};
            }
        }
        button.reply-box-cancel{
        }
        button.reply-box-submit{
            // &::before{
            //     content: "Submit";
            // }
            color: ${theme.colors.green_blue};
        }
    }
`
);

export const BlogSubCommentItem = styled.div`
    // background-color: lightblue;
    .Blog-Comment-Item-Header {
        background-color: transparent;
        .Blog-Sub-Comment-Reply-Span {
            // font-size: 14px;
            font-size: 0.9em;
            margin-left: 5px;
            color: ${theme.colors.grey};
        }
    }
    > .comment-tools {
        margin-left: 24px;
    }
`;

interface BlogCommentItemContentProps {
    displaytype: string;
}

export const BlogCommentItemContent = styled(
    'div'
)<BlogCommentItemContentProps>(
    ({ displaytype }) => `
    // background-color: aquamarine;
    // font-size: 14px;
    font-size: 0.9em;
    text-align: left;
    margin-left: ${displaytype === 'subcomment' ? '24px' : '0px'};
    padding-top: ${displaytype === 'subcomment' ? '0' : '.8em'};
`
);

interface PageCommentPaginationBarContainerProps {
    displaytype: string | undefined;
}

export const PageCommentPaginationBarContainer = styled(
    'div'
)<PageCommentPaginationBarContainerProps>(
    ({ displaytype }) => `
    margin-top: 2em;
    display: flex;
    margin-left: ${displaytype === 'subcomment' ? '24px' : '0px'};
    // background-color: antiquewhite;
    color: ${theme.colors.black};
    font-size: .9em;
    .index_container {
        // background-color: aliceblue;
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
    }

    span {
        display: inline-block;
        overflow-wrap: break-word;
        // border: 1px black solid;
        margin-left: .2em;
        padding: .3em .3em .3em .3em;
        line-height: 1em;
        cursor: pointer;
        // background-color: ${theme.colors.border_grey};
        border-radius: .2em;
        &:hover{
            color: ${theme.colors.clay_blue};
            text-decoration: underline;
        }
        &.selected {
            font-weight: bold;
            color: ${theme.colors.clay_blue}
            // background-color: aliceblue;
            // background: transparent;
        }
        &.index {
            // background-color: cornflowerblue;
        }
    }
    span.first {
        &::before{
            content: "First";
            @media only screen and (max-width: ${theme.breakpoints.mobile}) {
                content: "<<";
            }
        }
    }
    span.prev {
        &::before{
            content: "Prev";
            @media only screen and (max-width: ${theme.breakpoints.mobile}) {
                content: "<";
            }
        }
    }
    span.next {
        &::before{
            content: "Next";
            @media only screen and (max-width: ${theme.breakpoints.mobile}) {
                content: ">";
            }
        }
    }
    span.last {
        &::before{
            content: "Last";
            @media only screen and (max-width: ${theme.breakpoints.mobile}) {
                content: ">>";
            }
        }
    }
`
);
