import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';
import markedKatex from 'marked-katex-extension';
import 'highlight.js/styles/felipec.css';

import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import PageCommentMain from './PageCommentMain';
import { PageService, PageKeywordService } from '../../services/data';

import { MAX_TOC_DEPTH } from 'constants/viewpage.constant';
import type { _ReduxState, AuthState } from 'types/states';
import type { PageKeywordResData } from 'types/pagekeyword';
import type { PageResData } from 'types/page';
import type { PageMainCommentForwardRef } from 'types/page';

import './index.css';
import * as S from './style';

const PageMain = () => {
    const { pageId } = useParams();
    const [pageData, setPageData] = useState<PageResData | null>(null);
    const [keywords, setKeywords] = useState<PageKeywordResData[]>([]);
    const { user } = useSelector<_ReduxState, AuthState>((state) => state.auth);

    const commentRef = useRef<PageMainCommentForwardRef>(null);
    const navigate = useNavigate();

    const getKeywords = async () => {
        try {
            if (pageId) {
                const data: PageKeywordResData[] =
                    await PageKeywordService.getKeywordsByPageId(+pageId);
                setKeywords(data);
            }
        } catch (err: any) {
            console.error('error occurred while getting keywords...');
        }
    };

    const editSpanOnClick = () => {
        pageData && navigate(`/p/${pageData.id}/edit`);
    };

    useEffect(() => {
        const handleTocClick = (e: MouseEvent) => {
            e.preventDefault();
            const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
            const href: string | null = target.getAttribute('href');
            if (href) {
                const headerEle: HTMLElement | null = document.getElementById(
                    href.slice(1)
                );
                if (headerEle) {
                    headerEle.scrollIntoView({
                        // top: scrollTo,
                        block: 'center',
                        behavior: 'smooth', // 使用平滑滚动效果 or 'auto'立即滑到
                    });
                }
            }
        };

        interface ParseInfo {
            ignored: boolean;
            handleTocScroll?: () => void;
        }

        let parseInfo: ParseInfo = {
            ignored: false,
        };

        const getTitle = async () => {
            const generateTOC = (toc: Tokens.Heading[]): string => {
                const build = (
                    coll: Tokens.Heading[],
                    k: number,
                    level: number,
                    ctx: string[]
                ): number => {
                    if (k >= coll.length || coll[k].depth <= level) {
                        return k;
                    }
                    let node: Tokens.Heading = coll[k];
                    const anchor: string = node.text
                        .toLowerCase()
                        .replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
                    const pattern: string = `<li><a class='linktoc' href='#${anchor}'>${
                        node.text + ''
                    }</a>`;
                    ctx.push(pattern);
                    k++;
                    let childCtx: string[] = [];
                    k = build(coll, k, node.depth, childCtx);
                    if (childCtx.length > 0) {
                        ctx.push('<ul>');
                        childCtx.forEach(function (idm: string) {
                            ctx.push(idm);
                        });
                        ctx.push('</ul>');
                    }
                    ctx.push('</li>');
                    k = build(coll, k, level, ctx);
                    return k;
                };
                let ctx: string[] = [];
                ctx.push('<div id="Toc-Title">Table of Contents</div>\n<ul>');
                build(toc, 0, 0, ctx);
                ctx.push('</ul>');
                return ctx.join('');
            };
            try {
                if (!pageId) {
                    return;
                }
                const pageResData: PageResData = await PageService.getPageById(
                    +pageId
                );
                await getKeywords();

                if (!parseInfo.ignored) {
                    const newUrl: string = `/pages/@${pageResData.author}/${pageResData.id}`;
                    const parsedContent: string = marked.parse(
                        pageResData.content
                    ) as string;

                    const headings: Tokens.Heading[] = marked
                        .lexer(pageResData.content)
                        .filter(
                            (token) =>
                                token.type === 'heading' &&
                                token.depth <= MAX_TOC_DEPTH
                        ) as Tokens.Heading[];
                    const parsedTOC = generateTOC(headings);
                    // 用户提供的wildcard, 未必是真正的username
                    // 不刷新页面的情况下更改url
                    window.history.replaceState({}, document.title, newUrl);
                    setPageData(pageResData);

                    const blogContent: HTMLElement | null =
                        document.querySelector('#BlogContent');
                    if (blogContent) {
                        blogContent.innerHTML = parsedContent;
                    }

                    const blogTOC: HTMLElement | null = document.querySelector(
                        '#BlogTableofContents'
                    );
                    if (blogTOC) {
                        blogTOC.innerHTML = parsedTOC;
                    }
                    const blogTocLinks = document.querySelectorAll(
                        'li>a.linktoc'
                    ) as NodeListOf<HTMLAnchorElement>;
                    blogTocLinks.forEach((item) => {
                        item.addEventListener('click', handleTocClick);
                    });
                }
            } catch (err: any) {
                console.log(err.message || 'Error occurred.');
            }
        };

        marked.use(markedKatex({ throwOnError: false }));
        marked.use({
            renderer: {
                code(code, lang, info): string {
                    const language: string =
                        lang && hljs.getLanguage(lang) ? lang : 'plaintext';
                    return `<pre><code class="language-${language} hljs" data-highlighted="yes">${
                        hljs.highlight(code, { language }).value
                    }</code></pre>`;
                },
                image(href, title, text): string {
                    const percent: number =
                        (title && parseInt(title, 10)) || 100;
                    const resize: number =
                        percent > 100 || percent < 5 ? 100 : percent;
                    const ret: string = `<img class="resized" srcset="${href} ${
                        100 / resize
                    }x" alt="${text}"/>`;
                    return ret;
                },
                codespan(code): string {
                    return `<code class=codespan>${code}</code>`;
                },
                heading(text, level, raw): string {
                    if (level <= 2) {
                        const anchor: string = raw
                            .toLowerCase()
                            .replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
                        return `<h${level} id="${anchor}">${text}</h${level}>\n`;
                    } else {
                        return `<h${level}>${text}</h${level}>\n`;
                    }
                },
            },
        });
        getTitle();

        if (!parseInfo.ignored) {
            const tocEle: HTMLElement | null = document.querySelector(
                '#BlogTableofContents'
            );
            const tocPar: HTMLElement | null = document.querySelector(
                '#BlogTableofContentsContainer'
            );

            parseInfo.handleTocScroll = () => {
                if (!(tocPar && tocEle)) {
                    return;
                }
                const tmp4: number = tocPar.getBoundingClientRect().top;
                const navbarHight: number = window.innerHeight * 0.1;
                if (tmp4 >= navbarHight) {
                    tocEle.className = 'normal';
                } else if (
                    tmp4 >=
                    -tocPar.getBoundingClientRect().height +
                        navbarHight +
                        tocEle.getBoundingClientRect().height
                ) {
                    tocEle.className = 'sticky';
                } else {
                    tocEle.className = 'restore';
                }
            };
            window.addEventListener('scroll', parseInfo.handleTocScroll);
        }
        return () => {
            parseInfo.ignored = true;
            const blogTocLinks = document.querySelectorAll(
                'li>a.linktoc'
            ) as NodeListOf<HTMLAnchorElement>;
            blogTocLinks.forEach((item) => {
                item.removeEventListener('click', handleTocClick);
            });

            parseInfo.handleTocScroll &&
                window.removeEventListener('scroll', parseInfo.handleTocScroll);
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleBlogAuthorOnClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        navigate(`/users/@${pageData?.author}`);
    };

    return (
        <div>
            <NavBar displaytype="secondary"></NavBar>
            <S.BlogMain>
                {pageData && pageData.status !== 'published' ? (
                    <div className="BlogMainAlert">
                        Note current status for this post is {pageData.status},
                        only you can view this page.
                    </div>
                ) : null}
                <div className="BlogTitle">
                    <h1>{pageData?.title}</h1>
                </div>
                <div className="BlogTitleLabel">
                    <div className="BlogTitleLabelDates">
                        <span className="Blog-Title-Label-Date">
                            Created:{' '}
                            {(pageData &&
                                new Date(pageData.createdAt).toLocaleString(
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
                        <span className="Blog-Title-Label-Date">
                            Modified:{' '}
                            {(pageData &&
                                new Date(pageData.updatedAt).toLocaleString(
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
                    </div>
                    <div className="BlogTitleLabelKeywords">
                        <span className="Title-Label-Button">Keywords:</span>
                        {keywords.map((keyword, index) => (
                            <span key={index} className="Title-Label-Button">
                                {keyword.keyword}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="BlogAuthorInfoBar">
                    <div className="Avatar-Container">
                        <img
                            src={pageData?.avatar}
                            alt="avatar"
                            className="Avatar"
                        ></img>
                    </div>
                    <span
                        className="BlogAutherInfoUsername"
                        onClick={handleBlogAuthorOnClick}
                    >
                        {pageData?.author || ''}
                    </span>
                </div>
                <div className="BlogContentContainer">
                    <div id="BlogContent"></div>
                    {
                        <div id="BlogTableofContentsContainer">
                            <div
                                id="BlogTableofContents"
                                className="normal"
                            ></div>
                        </div>
                    }
                </div>
                <div id="BlogOpsContainer">
                    <button>Like </button>
                    {user && pageData && user.username === pageData.author && (
                        <button id="BlogOps-Edit" onClick={editSpanOnClick}>
                            Edit{' '}
                        </button>
                    )}
                    <button onClick={commentRef.current?.handleCommentOnClick}>
                        Comment{' '}
                    </button>
                </div>
                <PageCommentMain
                    ref={commentRef}
                    pageId={pageData?.id}
                ></PageCommentMain>
            </S.BlogMain>
            <Footer></Footer>
        </div>
    );
};

export default PageMain;
