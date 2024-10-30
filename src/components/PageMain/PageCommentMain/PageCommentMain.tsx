import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { NavigateFunction, useNavigate } from 'react-router-dom';
import React, { useImperativeHandle } from 'react';

import { ThreadService, CommentService } from '../../../services/data';

import type { ProfileBlogsData, PageMainCommentForwardRef } from 'types/page';
import type {
    PaginatedThreadsResData,
    SinglePaginatedThread,
} from 'types/thread';
import type { AuthState, _ReduxState } from 'types/states';
import type {
    PaginatedCommentsResData,
    SinglePaginatedComment,
} from 'types/comment';
import type {
    PaginatedESPagesResData,
    PaginatedESUsersResData,
} from 'types/search.es';

import * as S from './style';

interface PageSubCommentItemProps {
    comment: SinglePaginatedComment;
    handleReplyButtonOnClick: (targetUsername: string) => () => void;
    handleDeleteCommentOnClick: (commentId: number) => () => Promise<void>;
}

const PageSubCommentItem: React.FC<PageSubCommentItemProps> = ({
    comment,
    handleReplyButtonOnClick,
    handleDeleteCommentOnClick,
}) => {
    // comment maybe undefined
    const { isLoggedin, user } = useSelector<_ReduxState, AuthState>(
        (state) => state.auth
    );

    const handleDeleteComment = () => {
        // console.log('delete a comment');
    };

    return (
        <S.BlogSubCommentItem>
            <div className="Blog-Comment-Item-Header">
                <S.AvatarContainer displaytype="subcomment">
                    <img
                        src={comment.avatar}
                        alt="avatar"
                        className="Avatar"
                    ></img>
                </S.AvatarContainer>
                <span className="Blog-Comment-Username">{comment.from}</span>
                <span className="Blog-Sub-Comment-Reply-Span">replied to</span>
                <span className="Blog-Comment-Username">{comment.to}</span>
            </div>
            <S.BlogCommentItemContent displaytype="subcomment">
                <p>{comment.text || ''}</p>
            </S.BlogCommentItemContent>
            <div className="comment-tools">
                <span className="comment-date">
                    {(comment &&
                        new Date(comment.createdAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })) ||
                        ''}
                </span>
                <div className="comment-tools-ops">
                    {isLoggedin && user && user.username === comment.from && (
                        <a
                            className="delete-comment"
                            onClick={handleDeleteCommentOnClick(comment.id)}
                        >
                            <i className="fa-solid fa-trash"></i>
                        </a>
                    )}
                    {/* 如果是已登录状态，应该允许回复 */}
                    {isLoggedin && (
                        <a onClick={handleReplyButtonOnClick(comment.from)}>
                            <i className="fa-solid fa-reply"></i>
                        </a>
                    )}
                </div>
            </div>
        </S.BlogSubCommentItem>
    );
};

interface PageCommentItemProps {
    thread: SinglePaginatedThread;
    activeReplyBox: {
        activeReplyBoxThreadIdx: number;
        setActiveReplyBoxThreadIdx: React.Dispatch<
            React.SetStateAction<number>
        >;
    };
    handleDeleteThreadOnClick: (threadId: number) => () => Promise<void>;
}

const PageCommentItem: React.FC<PageCommentItemProps> = ({
    thread,
    activeReplyBox,
    handleDeleteThreadOnClick,
}) => {
    // 这里定义一个Thread
    // thread maybe undefined
    const threadId: number = thread.id;
    const [comments, setComments] = useState<PaginatedCommentsResData | null>(
        null
    );
    const [hideComments, setHideComments] = useState<boolean>(false);
    const { isLoggedin, user } = useSelector<_ReduxState, AuthState>(
        (state) => state.auth
    );
    const { activeReplyBoxThreadIdx, setActiveReplyBoxThreadIdx } =
        activeReplyBox;

    const [replyBoxValue, setReplyBoxValue] = useState<string>('');
    const [toUsername, setToUsername] = useState<string | null>(null);

    const navigate: NavigateFunction = useNavigate();

    const handleReplyButtonOnClick = (targetUsername: string) => () => {
        setActiveReplyBoxThreadIdx(thread.id);
        setReplyBoxValue('');
        setToUsername(targetUsername);
    };

    const handleHideComments = () => {
        setHideComments(true);
    };

    const handleShowComments = () => {
        setHideComments(false);
    };

    const handleDeleteThread = () => {
        // console.log(user);
        // console.log(thread);
    };

    const handleDeleteCommentOnClick = (commentId: number) => async () => {
        try {
            await CommentService.deleteCommentById(commentId);
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                navigate('/login');
            } else {
                console.log(err.message || 'Error while deleting the comment.');
            }
            return;
        }
        // 刷新comment
        if (comments) {
            await getComments(comments.current);
        }
    };

    const handleReplyBoxOnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setReplyBoxValue(e.target.value);
    };

    const handleReplyCancelOnClick = () => {
        // 关闭ReplyBox框
        setActiveReplyBoxThreadIdx(-1);
    };

    const handleReplySubmitOnClick = async () => {
        // 此时，应该追加comment, 然后刷新当前thread(的comments), 并将最新的
        // 追加的comment定位到用户可视区域
        try {
            if (toUsername) {
                await CommentService.createComment(threadId, {
                    to: toUsername,
                    text: replyBoxValue,
                });
            }
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                // 引导用户去登录
                navigate('/login');
            } else {
                console.log(err.message || 'Error while creating comment.');
            }
            return;
            // 可能会出现401错误
            // console.log(err.response);
            // console.log(err.message);
        }
        // 关闭ReplyBox框
        setActiveReplyBoxThreadIdx(-1);
        await getComments(-1); // 定向到最后一页
    };

    // thread maybe be undefined
    const getComments = async (commentPageId = 1) => {
        try {
            const commentsData: PaginatedCommentsResData =
                await CommentService.getCommentsByThreadId(
                    threadId,
                    commentPageId
                );
            setComments(commentsData);
            // 这里comments是一个json, 包括comments, total, current三个field
        } catch (err: any) {
            console.log(err.message || 'Error while loading comments');
        }
    };

    /*
    1. 一个post下面的评论区由若干个CommentItem(对应到数据库的CommentThread)构成, 我们可以通过
    threadId检索到一个特定的评论thread来渲染一个CommentItem
    2. 一个特定CommentItem/CommentThread又由一个CommentBody和若干个SubCommentItem构成, 对于
    一个SubCommentItem, 可以通过commentId检索一个特定的SubCommentItem来渲染一个SubCommentItem
    */

    useEffect(() => {
        getComments();
    }, [thread]);

    return (
        <S.BlogCommentItem>
            <div className="Blog-Comment-Item-Header">
                <S.AvatarContainer>
                    <img
                        src={thread.avatar}
                        alt="avatar"
                        className="Avatar"
                    ></img>
                </S.AvatarContainer>
                <span className="Blog-Comment-Username Thread-Owner">
                    {(thread && thread.author) || ''}
                </span>
            </div>
            <div className="Blog-Comment-Item-Body">
                <S.BlogCommentItemContent displaytype="comment">
                    <p>{(thread && thread.text) || ''}</p>
                </S.BlogCommentItemContent>

                <div className="comment-tools">
                    <span className="comment-date">
                        {(thread &&
                            new Date(thread.createdAt).toLocaleString(
                                undefined,
                                {
                                    year: 'numeric',
                                    month: 'short',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                }
                            )) ||
                            ''}
                    </span>
                    <div className="comment-tools-ops">
                        {comments &&
                            comments.comments.length > 0 &&
                            (hideComments ? (
                                <a
                                    className="view-replies"
                                    onClick={handleShowComments}
                                >
                                    <i className="fa-regular fa-eye"></i>
                                </a>
                            ) : (
                                <a
                                    className="hide-replies"
                                    onClick={handleHideComments}
                                >
                                    <i className="fa-regular fa-eye-slash"></i>
                                </a>
                            ))}
                        {/* 如果是thread的所有者，且处于登录状态应该允许删除 */}
                        {isLoggedin &&
                            user &&
                            user.username === thread.author && (
                                <a
                                    className="delete-comment"
                                    onClick={handleDeleteThreadOnClick(
                                        threadId
                                    )}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </a>
                            )}
                        {/* 如果是已登录状态，应该允许回复 */}
                        {isLoggedin && (
                            <a
                                onClick={handleReplyButtonOnClick(
                                    thread.author
                                )}
                            >
                                <i className="fa-solid fa-reply"></i>
                            </a>
                        )}
                    </div>
                </div>

                {!hideComments &&
                    comments &&
                    comments.comments.map((comment) => (
                        <PageSubCommentItem
                            key={comment.id}
                            comment={comment}
                            handleReplyButtonOnClick={handleReplyButtonOnClick}
                            handleDeleteCommentOnClick={
                                handleDeleteCommentOnClick
                            }
                        />
                    ))}
                {activeReplyBoxThreadIdx == thread.id && (
                    <S.ReplyBox displaytype="subcomment">
                        <textarea
                            value={replyBoxValue}
                            onChange={handleReplyBoxOnChange}
                            placeholder={`Reply to: ${toUsername}`}
                        />
                        <div className="reply-box-ops">
                            <button
                                onClick={handleReplyCancelOnClick}
                                className="reply-box-cancel"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                            <button
                                onClick={handleReplySubmitOnClick}
                                className="reply-box-submit"
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                        </div>
                    </S.ReplyBox>
                )}
            </div>
            {!hideComments && comments && comments.total > 1 && (
                <PaginationNavBar
                    displaytype="subcomment"
                    items={comments}
                    getItemsByIdx={getComments}
                />
            )}
        </S.BlogCommentItem>
    );
};

interface PaginationNavBarProps {
    displaytype?: string;
    getItemsByIdx: (threadPageId: number) => Promise<void>;
    items:
        | PaginatedThreadsResData
        | PaginatedCommentsResData
        | ProfileBlogsData
        | PaginatedESUsersResData
        | PaginatedESPagesResData;
}

export const PaginationNavBar: React.FC<PaginationNavBarProps> = ({
    displaytype,
    getItemsByIdx,
    items,
}) => {
    const getIndexList = (curPage: number, totalPages: number): number[] => {
        if (!(curPage && totalPages)) {
            return [];
        }
        const hasPrev: number = curPage > 1 ? 1 : 0;
        const hasNext: number = curPage < totalPages ? 1 : 0;
        const totalWidth: number = 15;
        let remainWidth: number = totalWidth - hasPrev * 4 - hasNext * 4;
        const coef: number = 0.3;
        const numLimit: number = 9;
        let _begin: number = curPage;
        let _end: number = curPage;
        // console.log('remain,', remainWidth);
        for (let offset: number = 1; offset <= numLimit - 1; offset++) {
            const _left: number = -offset + curPage;
            const _right: number = offset + curPage;
            if (_left >= 1) {
                remainWidth -=
                    (-1 + Math.abs(_left).toString().length) * coef + 1;
                // remainWidth -= 1;
                if (remainWidth >= 0) {
                    _begin = _left;
                } else {
                    break;
                }
            }
            if (_right <= totalPages) {
                remainWidth -=
                    (-1 + Math.abs(_right).toString().length) * coef + 1;
                // remainWidth -= 1;
                if (remainWidth >= 0) {
                    _end = _right;
                } else {
                    break;
                }
            }
        }
        const ret: number[] = [];
        for (let i: number = _begin; i <= _end; i++) {
            ret.push(i);
        }
        return ret;
    };

    const handlePaginationIndexClick = (
        e: React.MouseEvent<HTMLSpanElement>
    ) => {
        // console.log(e.target.innerText);

        // scoll 评论区到屏幕上方

        let targetIdx: string = '1';
        const target = e.target as HTMLSpanElement;
        switch (target.className) {
            case 'first':
                targetIdx = '1';
                break;
            case 'prev':
                targetIdx = (items.current - 1).toString();
                break;
            case 'next':
                targetIdx = (items.current + 1).toString();
                break;
            case 'last':
                targetIdx = items.total.toString();
                break;
            default:
                targetIdx = target.innerText;
        }
        getItemsByIdx(+targetIdx);
    };
    return (
        <S.PageCommentPaginationBarContainer displaytype={displaytype}>
            {items.current > 1 && (
                <span
                    className="first"
                    onClick={handlePaginationIndexClick}
                ></span>
            )}
            {items.current > 1 && (
                <span
                    className="prev"
                    onClick={handlePaginationIndexClick}
                ></span>
            )}
            <div className="index_container">
                {getIndexList(items.current, items.total).map((ele, index) => (
                    <span
                        key={index}
                        className={
                            (ele === items.current && 'selected') || 'index'
                        }
                        onClick={handlePaginationIndexClick}
                    >
                        {ele}
                    </span>
                ))}
            </div>
            {items.current < items.total && (
                <span
                    className="next"
                    onClick={handlePaginationIndexClick}
                ></span>
            )}
            {items.current < items.total && (
                <span
                    className="last"
                    onClick={handlePaginationIndexClick}
                ></span>
            )}
        </S.PageCommentPaginationBarContainer>
    );
};

interface PageCommentMainProps {
    pageId: undefined | number;
}

const PageCommentMain = React.forwardRef<
    PageMainCommentForwardRef,
    PageCommentMainProps
>((props, ref) => {
    const pageId: number | undefined = props.pageId; // 永远只记加载/处理第一篇博客下的threads

    const [threads, setThreads] = useState<PaginatedThreadsResData | null>(
        null
    );
    const [activeReplyBoxThreadIdx, setActiveReplyBoxThreadIdx] =
        useState<number>(-1);
    const [isMainReplyBoxOpen, setIsMainReplyBoxOpen] =
        useState<boolean>(false);
    const [mainReplyBoxValue, setMainReplyBoxValue] = useState<string>('');
    const navigate: NavigateFunction = useNavigate();

    useImperativeHandle(ref, () => ({
        handleCommentOnClick: (e) => {
            handleMakeBlogCommentOnClick(e);
        },
    }));

    const handleMakeBlogCommentOnClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ): void => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
        setMainReplyBoxValue('');
        setIsMainReplyBoxOpen(true);
    };

    const handleMainReplyBoxValueOnChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setMainReplyBoxValue(e.target.value);
    };

    const handleMainReplyCancelOnClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        // 关闭输入框
        setIsMainReplyBoxOpen(false);
    };

    const handleMainReplySubmitOnClick = async () => {
        // 创建一个新的thread
        try {
            if (pageId) {
                await ThreadService.createThread(pageId, {
                    text: mainReplyBoxValue,
                });
            }
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                // 引导用户去登录
                // console.log('401');
                navigate('/login');
            } else {
                console.log(err.message || 'Error while creating thread.');
            }
            return;
        }
        // 关闭回复框
        setIsMainReplyBoxOpen(false);
        // 刷新threads, 定位到最后一页
        await getThreads(-1);
    };

    const handleDeleteThreadOnClick = (threadId: number) => async () => {
        try {
            await ThreadService.deleteThreadById(threadId);
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                navigate('/login');
            } else {
                console.log(err.message || 'Error while deleting the thread.');
            }
            return;
        }
        // 删除thread之后，应该刷新threads表，并且将用户带到合适的页面, 保留在当前页码，无需考虑太多
        // 如果是增加thread, 那么应该要让用户看到新加入的thread, 应该带到最后一页
        if (threads) {
            await getThreads(threads.current);
        }
    };

    const getThreads = async (threadPageId: number = 1) => {
        try {
            if (props.pageId) {
                const data: PaginatedThreadsResData =
                    await ThreadService.getThreadsByPageId(
                        props.pageId,
                        threadPageId
                    );
                setThreads(data);
            }
        } catch (err: any) {
            console.log(err.message || 'Error occurred.');
        }
    };

    const getThreadsAndScroll = async (threadPageId: number = 1) => {
        await getThreads(threadPageId);
        const blogCommentBody: HTMLElement | null =
            document.querySelector('#BlogCommentBody');
        if (blogCommentBody) {
            window.scrollTo({
                top:
                    blogCommentBody.getBoundingClientRect().top +
                    window.scrollY -
                    100,
            });
        }
    };

    useEffect(() => {
        if (props.pageId) {
            getThreads();
        }
    }, [props.pageId]);

    return (
        <S.BlogCommentBody id="BlogCommentBody">
            {/* 展示若干threads */}
            {((threads && threads.threads) || []).map((thread) => (
                <PageCommentItem
                    key={thread.id}
                    thread={thread}
                    activeReplyBox={{
                        activeReplyBoxThreadIdx,
                        setActiveReplyBoxThreadIdx,
                    }}
                    handleDeleteThreadOnClick={handleDeleteThreadOnClick}
                />
            ))}

            {threads && threads.total > 1 && (
                <PaginationNavBar
                    items={threads}
                    getItemsByIdx={getThreadsAndScroll}
                />
            )}
            {isMainReplyBoxOpen && (
                <S.ReplyBox displaytype="main">
                    <textarea
                        value={mainReplyBoxValue}
                        onChange={handleMainReplyBoxValueOnChange}
                    />
                    <div className="reply-box-ops">
                        <button
                            onClick={handleMainReplyCancelOnClick}
                            className="reply-box-cancel"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <button
                            onClick={handleMainReplySubmitOnClick}
                            className="reply-box-submit"
                        >
                            <i className="fa-solid fa-check"></i>
                        </button>
                    </div>
                </S.ReplyBox>
            )}
        </S.BlogCommentBody>
    );
});

export default PageCommentMain;
