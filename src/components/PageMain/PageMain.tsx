import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { marked, Tokens } from 'marked';
import hljs from 'highlight.js';
import markedKatex from 'marked-katex-extension';
// import 'highlight.js/styles/felipec.css';
// import 'highlight.js/styles/sunburst.css';
import 'highlight.js/styles/stackoverflow-light.css';

import NavBar from '../NavBar';
import Footer from '../Footer/Footer';
import PageCommentMain from './PageCommentMain';
import Back2top from 'components/Back2top/Back2top';
import { PageService, PageKeywordService } from '../../services/data';

import { PageStatus } from 'enums/page.enum';
import { NavBarDisplayType } from 'enums/navbar.enum';
import { MAX_TOC_DEPTH } from 'constants/viewpage.constant';
import type { _ReduxState, AuthState } from 'types/states';
import type { PageKeywordResData } from 'types/pagekeyword';
import type { PageResData } from 'types/page';
import type { PageMainCommentForwardRef } from 'types/page';

import './index.css';
import * as S from './style';

interface PageMainTocProps {
    headings: Tokens.Heading[];
};

const PageMainToc: React.FC<PageMainTocProps> = ({headings}) => {
    // console.log(headings);
    interface HeadingHrefOff {
        href: string;
        offset: number;
    };

    const headingHrefOffList:HeadingHrefOff[] = [];
    let currentTocIdx:number = -1;

    const generateTOC = useCallback((toc: Tokens.Heading[]) => {
        const hrefList:string[] = [];
        let heading_index:number = 0;
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
            const hrefValue = `#${heading_index++}\$\$${anchor}`;
            const pattern: string = `<li><a class='linktoc' href="${hrefValue}">${
                node.text + ''
            }</a>`;
            hrefList.push(hrefValue);
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
        ctx.push('<div id="Toc-Title">Table of contents</div>\n<ul>');
        build(toc, 0, 0, ctx);
        ctx.push('</ul>');
        return {toc: ctx.join(''), hrefList};
    }, []);

    const handleTocClick = useCallback((e: MouseEvent) => {
        e.preventDefault();
        console.log('clicked..');
        const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
        console.log(target);
        const href: string | null = target.getAttribute('href');
        if (href) {
            console.log(href);
            const headerEle: HTMLElement | null = document.getElementById(
                href.slice(1)
            );
            console.log(headerEle);
            if (headerEle) {
                headerEle.scrollIntoView({
                    // top: scrollTo,
                    block: 'center',
                    behavior: 'smooth', // 使用平滑滚动效果 or 'auto'立即滑到
                });
            }
        }
    }, []);

    const handleUserScroll = () => {
        // console.log('you scrolled');
        const scrollOffset = window.scrollY || document.documentElement.scrollTop;
        // console.log(scrollOffset);
        const curOffset = window.innerHeight*.75 + scrollOffset;
        let idx:number = -1;
        headingHrefOffList.forEach((e, index) => {
            if(e.offset < curOffset) {
                idx = index;
            }
        });
        // console.log('idx is ', idx);
        if(idx == currentTocIdx) return;
        // console.log('idx is ', idx);
        // const idx:number = headingHrefOffList.findLastIndex((e) => (e.offset < curOffset));
        if(currentTocIdx > -1) {
            const preEle = document.querySelector<HTMLAnchorElement>(`a[href="${headingHrefOffList[currentTocIdx].href}"]`);
            preEle?.classList.remove('selected');
        }
        if(idx > -1){
            const nextEle = document.querySelector<HTMLAnchorElement>(`a[href="${headingHrefOffList[idx].href}"]`);
            nextEle?.classList.add('selected');
        }
        currentTocIdx = idx;
    };

    const getEleOffsetFromTopById:(id:string) => number|null = useCallback((id) => {
        const ele:HTMLElement|null = document.getElementById(id);
        if(ele) {
            const rect = ele.getBoundingClientRect();
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            return rect.top + scrollTop;
        }
        return null;
    },[]);

    useEffect(() => {
        const {toc: parsedTOC, hrefList} = generateTOC(headings);
        hrefList.forEach((hrefValue, index) => {
            const offset = getEleOffsetFromTopById(hrefValue.slice(1));
            if(offset){
                const tem:HeadingHrefOff = {
                    href: hrefValue,
                    offset,
                };
                headingHrefOffList.push(tem);
            }
        });
        // console.log('my list is...');
        // console.log(headingHrefOffList);
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
        document.addEventListener('scroll', handleUserScroll);
        // console.log('headings', headings);
        // if(headings.length === 0) {
            const container = document.querySelector('#BlogTableofContentsContainer') as HTMLDivElement|null;
            // if(container){
            //     container.style.display = headings.length === 0 ? 'none' : 'block';
            // }
            console.log('non-zero', headings.length);
            if(container && headings.length === 0){
                console.log('zero');
                // container.style.display = 'none';
            }
        // }
        return () => {
            const blogTocLinks = document.querySelectorAll(
                'li>a.linktoc'
            ) as NodeListOf<HTMLAnchorElement>;
            blogTocLinks.forEach((item) => {
                item.removeEventListener('click', handleTocClick);
            });
            document.removeEventListener('scroll', handleUserScroll);
        };
    }, [headings]);

    return (
        <div id="BlogTableofContentsContainer">
            <div
                id="BlogTableofContents"
                className="normal"
            ></div>
        </div>
    );
};

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

    const filteredHeadingsFromPage = useMemo(() => {
        const headings: Tokens.Heading[] = (pageData && marked.lexer(pageData.content)
            .filter((token) => token.type === 'heading') || []) as Tokens.Heading[];
        const topHeadingLevel = Math.min(...headings.map((token, index) => token.depth));
        const filteredHeadings = headings.filter((token, index)=> token.depth-topHeadingLevel < MAX_TOC_DEPTH);
        return filteredHeadings;
    }, [pageData]);

    useEffect(() => {

        interface ParseInfo {
            ignored: boolean;
            handleTocScroll?: () => void;
        }

        let parseInfo: ParseInfo = {
            ignored: false,
        };

        // let topHeadingLevel:number = 1;

        const getTitle = async () => {
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

                    // const headings: Tokens.Heading[] = marked.lexer(pageResData.content)
                    //     .filter((token) => token.type === 'heading') as Tokens.Heading[];
                    // topHeadingLevel = Math.min(...headings.map((token, index) => token.depth));
                    // const filteredHeadings = headings.filter((token, index)=> token.depth-topHeadingLevel < MAX_TOC_DEPTH);
                    // const headings: Tokens.Heading[] = marked
                    //     .lexer(pageResData.content)
                    //     .filter(
                    //         (token) =>
                    //             token.type === 'heading' &&
                    //             token.depth <= MAX_TOC_DEPTH
                    //     ) as Tokens.Heading[];
                    // const parsedTOC = generateTOC(filteredHeadings);
                    // 用户提供的wildcard, 未必是真正的username
                    // 不刷新页面的情况下更改url
                    window.history.replaceState({}, document.title, newUrl);
                    setPageData(pageResData);

                    const blogContent: HTMLElement | null =
                        document.querySelector('#BlogContent');
                    if (blogContent) {
                        blogContent.innerHTML = parsedContent;
                        // const blogback2topContainer: HTMLElement | null = document.querySelector('#BlogBack2topContainer');
                        // if(blogback2topContainer){
                        //     blogback2topContainer.style.display='block';
                        // }
                    }

                    // const blogTOC: HTMLElement | null = document.querySelector(
                    //     '#BlogTableofContents'
                    // );
                    // if (blogTOC) {
                    //     blogTOC.innerHTML = parsedTOC;
                    // }
                    // const blogTocLinks = document.querySelectorAll(
                    //     'li>a.linktoc'
                    // ) as NodeListOf<HTMLAnchorElement>;
                    // blogTocLinks.forEach((item) => {
                    //     item.addEventListener('click', handleTocClick);
                    // });
                }
            } catch (err: any) {
                console.log(err.message || 'Error occurred.');
            }
        };

        getTitle();

        let heading_idx:number = 0;
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
                    if (true) {
                        const anchor: string = raw
                            .toLowerCase()
                            .replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
                        return `<h${level} id="${heading_idx++}\$\$${anchor}">${text}</h${level}>\n`;
                    } else {
                        return `<h${level}>${text}</h${level}>\n`;
                    }
                },
            },
        });

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
                // const navbarHight: number = window.innerHeight * 0.1;
                const navbarHight = 100;
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
        const blogContentContainer: HTMLElement | null = document.querySelector(
            '#BlogContent'
        );
        const blogback2topContainer: HTMLElement | null = document.querySelector('#BlogBack2topContainer');
        const handleBack2topScroll = () => {
            if(blogContentContainer&&blogback2topContainer){
                const tmp5: number = blogContentContainer.getBoundingClientRect().bottom;
                const tmp6: number = blogContentContainer.getBoundingClientRect().top;
                const tmp7: number = blogContentContainer.getBoundingClientRect().right;
                // console.log(tmp5);
                // console.log(blogContentContainer.getBoundingClientRect());
                if(tmp6 >= 0 || tmp5 <= window.innerHeight) {
                    blogback2topContainer.className = 'xnormal';
                    // console.log('UP');
                }else if(tmp6<0){
                    blogback2topContainer.className = 'xsticky';
                    blogback2topContainer.style.top = `${window.innerHeight-80}px`;
                    blogback2topContainer.style.right = `${window.innerWidth-tmp7-20}px`;
                    // console.log('DOWN');
                }
            }
        };

        window.addEventListener('scroll', handleBack2topScroll);
        window.addEventListener('resize', handleBack2topScroll);
        return () => {
            parseInfo.ignored = true;
            // const blogTocLinks = document.querySelectorAll(
            //     'li>a.linktoc'
            // ) as NodeListOf<HTMLAnchorElement>;
            // blogTocLinks.forEach((item) => {
            //     item.removeEventListener('click', handleTocClick);
            // });

            parseInfo.handleTocScroll &&
                window.removeEventListener('scroll', parseInfo.handleTocScroll);
            window.removeEventListener('scroll', handleBack2topScroll);
            window.removeEventListener('resize', handleBack2topScroll);
        };
    }, [pageId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    const handleBlogAuthorOnClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        navigate(`/users/@${pageData?.author}`);
    };

    return (
        <div>
            <NavBar displaytype={NavBarDisplayType.SECONDARY}></NavBar>
            <S.BlogMain heading_len={filteredHeadingsFromPage.length}>
                {pageData && pageData.status !== PageStatus.PUBLISHED ? (
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
                            {'Created: '}
                            {/* {' '} */}
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
                    <div className='BlogContentInnerContainer'>
                        <div id="BlogContent">
                        </div>
                        <div id='BlogBack2topContainer' className='xnormal'>
                            <Back2top/>
                        </div>
                    </div>
                    {
                        // <div id="BlogTableofContentsContainer">
                        //     <div
                        //         id="BlogTableofContents"
                        //         className="normal"
                        //     ></div>
                        // </div>
                        <PageMainToc headings={filteredHeadingsFromPage}/>
                    }
                </div>
                <div id="BlogOpsContainer">
                    <button className='BlogOpsLike'>
                        <i className="fa-solid fa-heart"></i>
                        {/* Like */}
                    </button>
                    {user && pageData && user.username === pageData.author && (
                        <button id="BlogOps-Edit" onClick={editSpanOnClick}>
                            {/* Edit{' '} */}
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                    )}
                    <button onClick={commentRef.current?.handleCommentOnClick}
                    className='BlogOpsButtonComment'>
                        {/* Comment{' '} */}
                        <i className="fa-solid fa-comment"></i>
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
