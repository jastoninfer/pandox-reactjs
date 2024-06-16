import React, { useEffect, useState, useContext, useRef } from 'react';
// import PageDataService from '../../../services/page.service';
import { ThreadService, CommentService } from '../../../services/data';
// import avatar from '../../../static/user_icon.jpeg';
import { UseDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { forwardRef, useImperativeHandle } from 'react';

// import './index.css';
import * as S from './style';

// const CommentReplyContext = React.createContext();

const PageSubCommentItem = ({ comment, handleReplyButtonOnClick, handleDeleteCommentOnClick}) => {
    // comment maybe undefined
    // {id, text, from, to} = comment
    // console.log(comment);
    // console.log('------------||||------------');
    const {isLoggedin, user} = useSelector(state => state.auth);

    const handleDeleteComment = () => {
        console.log('delete a comment');
    };

    return (
        <S.BlogSubCommentItem>
            <div className='Blog-Comment-Item-Header'>
                <S.AvatarContainer displaytype='subcomment'>
                    <img src={comment.avatar} alt='avatar' className='Avatar'></img>
                </S.AvatarContainer>
                <span className='Blog-Comment-Username'>
                    {comment.from}
                </span>
                <span className='Blog-Sub-Comment-Reply-Span'>
                    replied to
                </span>
                <span className='Blog-Comment-Username'>
                    {comment.to}
                </span>
            </div>
            <S.BlogCommentItemContent displaytype='subcomment'>
                <p>
                    {comment.text || ''}
                </p>
            </S.BlogCommentItemContent>
            <div className='comment-tools'>
                <span className='comment-date'>
                    { (comment && new Date(comment.createdAt).toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                        })) || '' 
                    }
                </span>
                <div className='comment-tools-ops'>
                    {isLoggedin && (user.username==comment.from) && (<a className='delete-comment' onClick={handleDeleteCommentOnClick(comment.id)}>Delete</a>)}
                    {/* 如果是已登录状态，应该允许回复 */}
                    {isLoggedin && (<a onClick={handleReplyButtonOnClick(comment.from)}>Reply</a>)}
                </div>
            </div>
        </S.BlogSubCommentItem>
    );
};

const PageCommentItem = ({ thread, activeReplyBox, handleDeleteThreadOnClick}) => {
    // 这里定义一个Thread
    // thread maybe undefined
    // console.log(thread);
    // console.log('---------------->>>>>>');
    const threadId = (thread && thread.id) || -1;
    const [comments, setComments] = useState([]);
    const [hideComments, setHideComments] = useState(false);
    const {isLoggedin, user} = useSelector(state => state.auth);
    // const replyBoxOpenThreadIdx = useContext(CommentReplyContext);
    const {activeReplyBoxThreadIdx, setActiveReplyBoxThreadIdx} = activeReplyBox;

    const [replyBoxValue, setReplyBoxValue] = useState('');
    const [toUsername, setToUsername] = useState(null);

    const navigate = useNavigate();

    const handleReplyButtonOnClick = (targetUsername) => () => {
        // console.log(replyBoxOpenThreadIdx);
        setActiveReplyBoxThreadIdx(thread.id||-1);
        setReplyBoxValue('');
        setToUsername(targetUsername);
        // toUsername.current = targetUsername;
    };

    const handleHideComments = () => {
        setHideComments(true);
    };

    const handleShowComments = () => {
        setHideComments(false);
    };

    const handleDeleteThread = () => {
        console.log(user);
        console.log(thread);
    };
    const handleDeleteCommentOnClick = (commentId) => async () => {
        try {
            await CommentService.deleteCommentById(commentId);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }else {
                console.log(err.message || 'Error while deleting the comment.');
            }
            return;
        }
        // 刷新comment
        await getComments(comments.current);
    }

    const handleReplyBoxOnChange = (e) => {
        setReplyBoxValue(e.target.value);
    }

    const handleReplyCancelOnClick = (e) => {
        // 关闭ReplyBox框
        setActiveReplyBoxThreadIdx(-1);
    };

    const handleReplySubmitOnClick = async () => {
        // 此时，应该追加comment, 然后刷新当前thread(的comments), 并将最新的
        // 追加的comment定位到用户可视区域
        console.log('submit...');
        console.log('tousername is', toUsername);
        try {
            await CommentService.createComment(threadId, {
                toUsername: toUsername,
                text: replyBoxValue,
            });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // 引导用户去登录
                // console.log('401');
                navigate('/login');
            }else {
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
        // await CommentService.getCommentsByThreadId(threadId, 0);
    }

    // const handleDeleteOnClick = async () => {
    //     try {
    //         await ThreadService.deleteThreadById(threadId);
    //     } catch (err) {
    //         if (err.response && err.response.status === 401) {
    //         }else {
    //             console.log(err.message || 'Error while deleting the thread.');
    //         }
    //         return;
    //     }
    //     // 删除thread之后，应该刷新threads表，并且
    // };

    // thread maybe be undefined
    const getComments = async (commentPageId=1) => {
        try {
            const commentsData = 
                await CommentService.getCommentsByThreadId(threadId, commentPageId);
                // await PageDataService.getCommentsByThreadId(threadId);
            // const commentsData = {data: [{a:1}, {b:2}]};
            // console.log('comments data is...');
            // console.log(commentsData.data);

            // console.log('<<<<<<-------------');
            setComments(commentsData.data);
            // 这里comments是一个json, 包括comments, total, current三个field
            // setComments(commentsData.data.map(res => res.text));
            // setComments(prevData => commentsData.data);
        } catch (err) {
            console.log(err.message || 'Error while loading comments');
        };
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

    return(
        <S.BlogCommentItem>
            <div className='Blog-Comment-Item-Header'>
                <S.AvatarContainer>
                    <img src={thread.avatar} alt='avatar' className='Avatar'></img>
                </S.AvatarContainer>
                <span className='Blog-Comment-Username'>
                    {(thread && thread.author) || ''}
                </span>
            </div>
            <div className='Blog-Comment-Item-Body'>
                <S.BlogCommentItemContent displaytype='comment'>
                    <p>
                        { (thread && thread.text) || '' }
                    </p>
                </S.BlogCommentItemContent>
                
                <div className='comment-tools'>
                    <span className='comment-date'>
                        { (thread && new Date(thread.createdAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            })) || '' 
                        }
                    </span>
                    <div className='comment-tools-ops'>
                        {comments.comments && comments.comments.length > 0 && (hideComments ? 
                            <a className='view-replies' onClick={handleShowComments}></a> : <a className='hide-replies' onClick={handleHideComments}></a>)}
                        {/* 如果是thread的所有者，且处于登录状态应该允许删除 */}
                        {isLoggedin && (user.username==thread.author) && (<a className='delete-comment' onClick={handleDeleteThreadOnClick(threadId)}>Delete</a>)}
                        {/* 如果是已登录状态，应该允许回复 */}
                        {isLoggedin && (<a onClick={handleReplyButtonOnClick(thread.author)}>Reply</a>)}
                    </div>
                </div>
                
                {/* <PageSubCommentItem comment={`123`}></PageSubCommentItem> */}
                {/* {[{},{},{}].map(thread => (<PageCommentItem key={thread.id} thread={thread}></PageCommentItem>))} */}
                {/* {[{},{},{}].map(comment => (<PageSubCommentItem comment={comment}></PageSubCommentItem>))} */}
                { !hideComments && comments.comments && comments.comments.map(comment => (
                <PageSubCommentItem 
                    key={comment.id} comment={comment} toUsernameRef={toUsername}
                    handleReplyButtonOnClick = {handleReplyButtonOnClick}
                    handleDeleteCommentOnClick={handleDeleteCommentOnClick}>
                </PageSubCommentItem>)) }
                {activeReplyBoxThreadIdx==thread.id && (
                <S.ReplyBox displaytype='subcomment'>
                    <textarea
                        type='text'
                        value={replyBoxValue}
                        onChange={handleReplyBoxOnChange}
                        placeholder={`Reply to: ${toUsername}`}
                    />
                    <div className='reply-box-ops'>
                        <button onClick={handleReplyCancelOnClick} className='reply-box-cancel'></button>
                        <button onClick={handleReplySubmitOnClick} className='reply-box-submit'></button>
                    </div>
                </S.ReplyBox>)}
            </div>
            {!hideComments && comments.total>1&& (<PaginationNavBar displaytype='subcomment' items={comments} getItemsByIdx={getComments}></PaginationNavBar>)}
        </S.BlogCommentItem>
    );
};

export const PaginationNavBar = ({ displaytype, getItemsByIdx, items}) => {
    const getIndexList = (curPage, totalPages) => {
        if(!(curPage && totalPages)){
            return [];
        }
        const hasPrev = curPage > 1 ? 1 : 0;
        const hasNext = curPage < totalPages ? 1 : 0;
        const totalWidth = 15;
        let remainWidth = totalWidth - hasPrev * 4 - hasNext * 4;
        const coef = 0.3;
        const numLimit = 9;
        let _begin = curPage;
        let _end = curPage;
        // console.log('remain,', remainWidth);
        for(let offset = 1; offset <= (numLimit-1); offset++){
            const _left = -offset + curPage;
            const _right = offset + curPage;
            if(_left >= 1){
                remainWidth -= (-1+Math.abs(_left).toString().length) * coef + 1;
                // remainWidth -= 1;
                if(remainWidth >= 0) {
                    _begin = _left;
                }else{
                    break;
                }
            }
            if(_right <= totalPages){
                remainWidth -= (-1+Math.abs(_right).toString().length) * coef + 1;
                // remainWidth -= 1;
                if(remainWidth >= 0) {
                    _end = _right;
                }else{
                    break;
                }
            }
        }
        const ret = [];
        for (let i = _begin; i <= _end; i++){
            ret.push(i);
        }
        return ret;
    }

    const handlePaginationIndexClick = (e) => {
        // console.log(e.target.innerText);
        
        // scoll 评论区到屏幕上方
        // document.querySelector('#BlogCommentBody').scrollIntoView({
        //     // top: scrollTo,
        //     block: 'start',
        //     // top: 0,
        //     behavior: 'instant', // 使用平滑滚动效果 or 'auto'立即滑到
        //   });
        // window.scrollTo({top: document.querySelector('#BlogCommentBody').getBoundingClientRect().top + window.scrollY-100});
        let targetIdx = '1';
        switch (e.target.className) {
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
                targetIdx = e.target.innerText;
        }
        getItemsByIdx(targetIdx);
        // getThreads(targetIdx);
    }
    return (
        <S.PageCommentPaginationBarContainer displaytype={displaytype}>
            {items.current > 1 && <span className='first' onClick={handlePaginationIndexClick}></span>}
            {items.current > 1 && <span className='prev' onClick={handlePaginationIndexClick}></span>}
            <div className='index_container'>
                {getIndexList(items.current, items.total).map((ele, index) => <span key={index} className={ele===items.current&&'selected'||'index'} onClick={handlePaginationIndexClick}>{ele}</span>)}
                {/* <span class='selected'>{value}</span> */}
            </div>
            {items.current < items.total && <span className='next' onClick={handlePaginationIndexClick}></span>}
            {items.current < items.total && <span className='last' onClick={handlePaginationIndexClick}></span>}
        </S.PageCommentPaginationBarContainer>
    );
};

const PageCommentMain = forwardRef((props, ref) => {

    const pageId = 1;// 永远只记加载/处理第一篇博客下的threads

    const [threads, setThreads] = useState({});
    const [activeReplyBoxThreadIdx, setActiveReplyBoxThreadIdx] = useState(-1);
    // const [comments, setComments] = useState([]);
    const [isMainReplyBoxOpen, setIsMainReplyBoxOpen] = useState(false);
    const [mainReplyBoxValue, setMainReplyBoxValue] = useState('');
    const navigate = useNavigate();

    useImperativeHandle(ref, () => ({
        handleCommentOnClick: (e) => {
            handleMakeBlogCommentOnClick(e);
        }
    }));

    const handleMakeBlogCommentOnClick = (e) => {
        // console.log('123-=>');
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        });
        setMainReplyBoxValue('');
        setIsMainReplyBoxOpen(true);
    };

    const handleMainReplyBoxValueOnChange = (e) => {
        setMainReplyBoxValue(e.target.value);
    };

    const handleMainReplyCancelOnClick = (e) => {
        // 关闭输入框
        setIsMainReplyBoxOpen(false);
    };

    const handleMainReplySubmitOnClick = async () => {
        // 创建一个新的thread
        try {
            await ThreadService.createThread(pageId, {
                text: mainReplyBoxValue
            });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // 引导用户去登录
                // console.log('401');
                navigate('/login');
            }else {
                console.log(err.message || 'Error while creating thread.');
            }
            return;
        }
        // 关闭回复框
        setIsMainReplyBoxOpen(false);
        // 刷新threads, 定位到最后一页
        await getThreads(-1);
    };


    const handleDeleteThreadOnClick = (threadId) => async () => {
        try {
            await ThreadService.deleteThreadById(threadId);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate('/login');
            }else {
                console.log(err.message || 'Error while deleting the thread.');
            }
            return;
        }
        // 删除thread之后，应该刷新threads表，并且将用户带到合适的页面, 保留在当前页码，无需考虑太多
        // 如果是增加thread, 那么应该要让用户看到新加入的thread, 应该带到最后一页
        await getThreads(threads.current);
    };

    const getThreads = async (threadPageId=1) => {
        // console.log(123);
        try {
            // const res = await PageDataService.getPageById(1);
            // console.log('|||---------------------->>>>');
            const res = await ThreadService.getThreadsByPageId(pageId, threadPageId);
            // const res = await PageDataService.getThreadsById(pageId, threadPageId);
            // console.log('res.data is....');
            // console.log(res.data);
            setThreads(res.data);
            // const threadId = (res.data[0] && res.data[0].id) || -1;
            // const curComments = threadId > 0 ?
            //     await PageDataService.getCommentsByThreadId(threadId) : [];
            // setComments(prevData => {
            //     return curComments.data.map(res => res.text) || [];
                // return [{key:1},2,3];
                // return curComments.data;
            // });
            // console.log('comments is ', curComments.data);
            // console.log(res.data);
            // setTitle(res.data.title);
            // setContent(res.data.content);
            // console.log(res.data.content);
        } catch (err){
            console.log(err.message || 'Error occurred.');
        }
    };

    const getIndexList = (curPage, totalPages) => {
        if(!(curPage && totalPages)){
            return [];
        }
        const hasPrev = curPage > 1 ? 1 : 0;
        const hasNext = curPage < totalPages ? 1 : 0;
        const totalWidth = 15;
        let remainWidth = totalWidth - hasPrev * 4 - hasNext * 4;
        const coef = 0.3;
        const numLimit = 9;
        let _begin = curPage;
        let _end = curPage;
        // console.log('remain,', remainWidth);
        for(let offset = 1; offset <= (numLimit-1); offset++){
            const _left = -offset + curPage;
            const _right = offset + curPage;
            if(_left >= 1){
                remainWidth -= (-1+Math.abs(_left).toString().length) * coef + 1;
                // remainWidth -= 1;
                if(remainWidth >= 0) {
                    _begin = _left;
                }else{
                    break;
                }
            }
            if(_right <= totalPages){
                remainWidth -= (-1+Math.abs(_right).toString().length) * coef + 1;
                // remainWidth -= 1;
                if(remainWidth >= 0) {
                    _end = _right;
                }else{
                    break;
                }
            }
        }
        const ret = [];
        for (let i = _begin; i <= _end; i++){
            ret.push(i);
        }
        return ret;
    }

    const getThreadsAndScroll = async (threadPageId=1) => {
        await getThreads(threadPageId);
        window.scrollTo({top: document.querySelector('#BlogCommentBody').getBoundingClientRect().top + window.scrollY-100});
    }

    const handlePaginationIndexClick = (e) => {
        // console.log(e.target.innerText);
        
        // scoll 评论区到屏幕上方
        // document.querySelector('#BlogCommentBody').scrollIntoView({
        //     // top: scrollTo,
        //     block: 'start',
        //     // top: 0,
        //     behavior: 'instant', // 使用平滑滚动效果 or 'auto'立即滑到
        //   });
        window.scrollTo({top: document.querySelector('#BlogCommentBody').getBoundingClientRect().top + window.scrollY-100});
        // 这里的滚动效果只适合Threads, 不适合其他场合，或许可以允许用户定制....
        let targetIdx = '1';
        switch (e.target.innerText) {
            case 'First':
                targetIdx = '1';
                break;
            case 'Prev':
                targetIdx = (threads.current - 1).toString();
                break;
            case 'Next':
                targetIdx = (threads.current + 1).toString();
                break;
            case 'Last':
                targetIdx = threads.total.toString();
                break;
            default:
                targetIdx = e.target.innerText;
        }
        getThreads(targetIdx);
    }
    
    // getThreads();

    useEffect(() => {
        getThreads();
    }, []);

    return (
 
            <S.BlogCommentBody id='BlogCommentBody'>
                {/* <div>
                    <button onClick={()=>{setIsMainReplyBoxOpen(true);}}>Make a comment</button>
                </div> */}
                {/* 展示若干threads */}
                {(threads.threads||[]).map(thread => (
                <PageCommentItem key={thread.id} thread={thread}
                    activeReplyBox={{activeReplyBoxThreadIdx, setActiveReplyBoxThreadIdx}}
                    handleDeleteThreadOnClick={handleDeleteThreadOnClick}>
                </PageCommentItem>))}
                
                {threads.total > 1 && (<PaginationNavBar items={threads} getItemsByIdx={getThreadsAndScroll}></PaginationNavBar>)}
                {/* <PageCommentPaginationBar curPage={threads.currentPage} totalPages={threads.cntThreadPages}></PageCommentPaginationBar> */}
                {isMainReplyBoxOpen && (
                <S.ReplyBox displaytype='main'>
                    <textarea
                        type='text'
                        value={mainReplyBoxValue}
                        onChange={handleMainReplyBoxValueOnChange}
                    />
                    <div className='reply-box-ops'>
                        <button onClick={handleMainReplyCancelOnClick} className='reply-box-cancel'></button>
                        <button onClick={handleMainReplySubmitOnClick} className='reply-box-submit'></button>
                    </div>
                </S.ReplyBox>)}
            </S.BlogCommentBody>

    );
});

export default PageCommentMain;