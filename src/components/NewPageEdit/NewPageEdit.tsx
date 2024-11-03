import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import markedKatex from 'marked-katex-extension';
import { marked } from 'marked';
import hljs from 'highlight.js';

import {crosshairCursor, EditorView, keymap, drawSelection, highlightActiveLine, rectangularSelection, highlightActiveLineGutter} from "@codemirror/view";
import { EditorState } from '@codemirror/state';
import {defaultKeymap, history, historyKeymap, indentWithTab} from '@codemirror/commands'
import { foldGutter, defaultHighlightStyle, syntaxHighlighting, indentOnInput, indentUnit, bracketMatching, foldKeymap } from '@codemirror/language'
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { Table } from '@lezer/markdown';
import { languages } from '@codemirror/language-data';
import { highlightSelectionMatches } from '@codemirror/search';
import richEditor from './richUtils/src';
import markDocConfig from './richUtils/markdoc';


import NavBar from '../NavBar';
import { PageService } from '../../services/data';
import {
    useLocation,
    useParams,
    useNavigate,
    Outlet,
    NavLink,
    useOutletContext,
    NavigateFunction,
} from 'react-router-dom';

import { NavBarDisplayType } from 'enums/navbar.enum';
import { PageStatus } from 'enums/page.enum';
import { DEFAULT_PAGE_STATUS } from 'constants/editpage.constant';

import Footer from '../Footer/Footer';
import type { AuthState, _ReduxState } from 'types/states';
import type { PageResData } from 'types/page';
import type { _MessageResData } from 'types/services';

import * as S from './style';

import 'katex/dist/katex.css';
import { AxiosError } from 'axios';
import { logout } from 'actions/auth';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { A_Any } from 'types/actions';
import { Dispatch } from 'redux';

interface PageEditTabContentEditorProps {
    parentMatch?: string;
}

type NewPageEditOutletContext = {
    titleRef: React.MutableRefObject<string>;
    statusRef: React.MutableRefObject<PageStatus>;
    contentRef: React.MutableRefObject<string>;
};

export const PageEditTabContentEditor: React.FC<
    PageEditTabContentEditorProps
> = ({ parentMatch }) => {
    const { titleRef, statusRef, contentRef }: NewPageEditOutletContext =
        useOutletContext();
    const [title, setTitle] = useState<string>(titleRef.current);
    const location = useLocation();
    const navigate: NavigateFunction = useNavigate();
    /* PageEditTabContentEditor: title and current page status */

    useEffect(() => {
        if (parentMatch === '') {
            navigate(location.pathname + '/editor');
        }
    }, []);

    type EditorBlogTitleProps = Omit<NewPageEditOutletContext, 'contentRef'>;

    const EditorBlogTitle: React.FC<EditorBlogTitleProps> = ({
        statusRef,
        titleRef,
    }) => {
        /* EditorBlogTitle:  title and current status */
        const [status, setStatus] = useState<PageStatus>(statusRef.current);
        const [title, setTitle] = useState<string>(titleRef.current);

        const handleStatusChange = (
            e: React.ChangeEvent<HTMLSelectElement>
        ) => {
            if (e.target.value) {
                setStatus(e.target.value as PageStatus);
                statusRef.current = e.target.value as PageStatus;
            }
        };

        const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            titleRef.current = e.target.value;
        };

        return (
            <S.EditorTools>
                <div className="editor-tools-title-container">
                    <span>
                        <i className="fa-solid fa-heading"></i>
                    </span>
                    <input
                        className="edit-title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="editor-tools-status-container">
                    <span>
                        <i className="fa-solid fa-chart-simple"></i>
                    </span>
                    <div className="select-wrapper">
                        <select value={status || ''} onChange={handleStatusChange}>
                            <option value={PageStatus.DRAFT}>
                                {PageStatus.DRAFT}
                            </option>
                            <option value={PageStatus.PRIVATE}>
                                {PageStatus.PRIVATE}
                            </option>
                            <option value={PageStatus.PUBLISHED}>
                                {PageStatus.PUBLISHED}
                            </option>
                        </select>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                </div>
            </S.EditorTools>
        );
    };

    type EditorBlogContentProps = Pick<NewPageEditOutletContext, 'contentRef'>;

    const EditorBlogContent: React.FC<EditorBlogContentProps> = ({
        contentRef,
    }) => {
        const [text, setText] = useState<string>(contentRef.current);
        const textareaRef = useRef<HTMLTextAreaElement>(null);
        const editorRef = useRef(null);
        const scrollTop = useRef<number>(0);

        useEffect(() => {
            const startState = EditorState.create({
                doc: contentRef.current,
                extensions: [
                    richEditor({
                        markdoc: markDocConfig,
                        lezer: {
                            codeLanguages: languages,
                            extensions: [Table]
                        }
                    }),
                    // lineNumbers(),
                    highlightActiveLineGutter(),
                    // highlightSpecialChars(),
                    indentUnit.of('    '),
                    EditorState.allowMultipleSelections.of(true),
                    bracketMatching(),
                    closeBrackets(),
                    autocompletion(),
                    EditorView.lineWrapping,
                    history(),
                    foldGutter(),
                    drawSelection(),
                    rectangularSelection(),
                    crosshairCursor(),
                    highlightActiveLine(),
                    indentOnInput(),
                    highlightSelectionMatches(),
                    syntaxHighlighting(defaultHighlightStyle),
                    keymap.of([indentWithTab,
                        ...closeBracketsKeymap,
                        ...defaultKeymap,
                        ...historyKeymap,
                        ...foldKeymap,
                        ...completionKeymap,
                    ]),
                    EditorView.updateListener.of((update) => {
                        if(update.changes) {
                            const newText = update.state.doc.toString();
                            contentRef.current = newText;
                            setText(newText);
                        }
                    }),
                ],
            });
            if(editorRef.current) {
                const editor = new EditorView({
                    state: startState,
                    parent: editorRef.current,
                });
                return () => {
                    editor && editor.destroy();
                };
            }
        }, []);

        useEffect(() => {
            
            if (textareaRef.current) {
                textareaRef.current.style.height = '0px';
                const height: number = textareaRef.current.scrollHeight;
                const computedStyle: CSSStyleDeclaration =
                    window.getComputedStyle(textareaRef.current);
                const paddingTop: number = parseFloat(computedStyle.paddingTop);
                const paddingBottom: number = parseFloat(
                    computedStyle.paddingBottom
                );
                const newHeight: number = height - paddingTop - paddingBottom;
                textareaRef.current.style.height = `${newHeight}px`;
            }
            document.documentElement.scrollTop = scrollTop.current;
        }, [text]);

        /* body */
        return (
            <S.MarkdownEditor>
                <div id='codemirror-draw' ref={editorRef}></div>
            </S.MarkdownEditor>
        );
    };

    return (
        <S.TabContentEditor>
            <EditorBlogTitle
                statusRef={statusRef}
                titleRef={titleRef}
            ></EditorBlogTitle>
            <EditorBlogContent contentRef={contentRef}></EditorBlogContent>
        </S.TabContentEditor>
    );
};

export const PageEditTabContentPreviewer = () => {
    const { contentRef, titleRef, statusRef }: NewPageEditOutletContext =
        useOutletContext();
    const previewRef = useRef<HTMLDivElement>(null);

    /* preivew of body */

    useEffect(() => {
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
                    const resize = percent > 100 || percent < 5 ? 100 : percent;
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

        const markdownText: string = `# ${titleRef.current}\n${contentRef.current}`;
        const parsedContent: string = marked.parse(markdownText) as string;
        const blogContentElement: null | HTMLElement =
            document.querySelector('#BlogContent');
        if (blogContentElement) {
            blogContentElement.innerHTML = parsedContent;
        }
    }, []);

    return <div id="BlogContent" ref={previewRef}></div>;
};

const NewPageEdit = () => {
    // pageId maybe undefined
    const { pageId, wildcard } = useParams<string>();
    const navigate: NavigateFunction = useNavigate();
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const { user } = useSelector<_ReduxState, AuthState>((state) => state.auth);
    const [unauthorized, setUnauthorized] = useState<boolean>(false);

    const titleRef = useRef<string>('');
    const statusRef = useRef<PageStatus>(DEFAULT_PAGE_STATUS);
    const contentRef = useRef<string>('');

    const dispatch: ThunkDispatch<_ReduxState, void, A_Any> = useDispatch();

    const handleSubmit = async () => {
        if (pageId) {
            // update
            try {
                const msg: _MessageResData = await PageService.updatePageById(
                    +pageId,
                    {
                        title: titleRef.current,
                        content: contentRef.current,
                        status: statusRef.current,
                    }
                );
            } catch (err: any) {
                console.log(
                    (err.message || 'Error occurred') +
                        ' ' +
                        ((err.response.data && err.response.data.message) || '')
                );
            }

            navigate(`/pages/@${user?.username}/${pageId}`);

        } else {
            // add
            try {
                const data: PageResData = await PageService.createPage({
                    title: titleRef.current,
                    content: contentRef.current,
                    status: statusRef.current,
                });
                navigate(`/pages/@${data.author}/${data.id}`);
            } catch (err: any) {
                if(err instanceof AxiosError &&
                    err.response?.status === 401 &&
                    err.response?.data.message === 'TokenExpiredError'){
                        //redirect
                        await dispatch(logout());
                        navigate('/login');
                }else{
                    console.log(err.message || 'Error occurred.');
                }
            }
        }
    };

    type GetTitleInfoType = {
        isUnmounted: boolean;
    };

    const getTitle = async (info: GetTitleInfoType) => {
        try {
            const data: PageResData | null = pageId
                ? await PageService.getPageById(+pageId)
                : null;
            if (!info.isUnmounted) {
                if (data) {
                    titleRef.current = data.title;
                    statusRef.current = data.status;
                    contentRef.current = data.content;
                }
                setIsMounted(true);
            }
            return data;
        } catch (err: any) {
            console.log(err.message || 'Error occurred.');
            return null;
        }
    };

    useEffect(() => {
        // redirect to log in page
        if (!user) {
            navigate(`/login`);
            return;
        }
    }, [user]);

    useEffect(() => {
        const info: GetTitleInfoType = { isUnmounted: false };
        getTitle(info)
            .then((data) => {
                if (user && data && data.author !== user.username) {
                    setUnauthorized(true);
                }
            })
            .catch((err) => {});
        return () => {
            info.isUnmounted = true;
        };
    }, []);

    const EditorHeader = () => {
        const lastScrollTopRef = useRef<number>(0);
        const [scrollDirection, setScrollDirection] = useState<string | null>(
            null
        );
        useEffect(() => {
            const handleScroll = () => {
                const scrollTop: number =
                    window.scrollY || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTopRef.current) {
                    setScrollDirection('down');
                } else if (scrollTop > 0.35 * window.innerHeight) {
                    setScrollDirection('up');
                }
                lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop;
            };
            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }, []);

        return (
            <S.EditHeaderContainer>
                <div className="edit-header">
                    <NavLink to="./editor" className="editor-tab-edit">
                        <i className="fa-solid fa-file-pen"></i>
                    </NavLink>
                    <NavLink to="./previewer" className="editor-tab-preview">
                        <i className="fa-solid fa-file-contract"></i>
                    </NavLink>
                    <button
                        className="editor-tab-submit"
                        onClick={handleSubmit}
                    >
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </S.EditHeaderContainer>
        );
    };

    return (
        <div>
            <NavBar displaytype={NavBarDisplayType.SECONDARY} ext={<EditorHeader/>}/>
            {unauthorized ? (
                <S.EditContainer>
                    <h1>Unauthorized.</h1>
                </S.EditContainer>
            ) : (
                (isMounted && (
                    <S.EditContainer>
                        <S.EditorContainer>
                            <Outlet
                                context={
                                    {
                                        titleRef,
                                        statusRef,
                                        contentRef,
                                    } as NewPageEditOutletContext
                                }
                            />
                        </S.EditorContainer>
                    </S.EditContainer>
                )) || <S.EditorContentLoading />
            )}
            <Footer />
        </div>
    );
};

export default NewPageEdit;
