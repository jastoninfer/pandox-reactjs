import MDEditor from '@uiw/react-md-editor/nohighlight';
import katex from "katex";
import "katex/dist/katex.css";
import React, { useState, useEffect, useRef} from 'react';
import { getCodeString } from "rehype-rewrite";
import NavBar from '../../components/NavBar';
// import PageDataService from '../../services/page.service';
import { PageService } from '../../services/data';
import { useLocation, useParams, useNavigate, Outlet, NavLink, useOutletContext} from 'react-router-dom';

import { useSelector } from 'react-redux';
// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';

// import FroalaEditorComponent from 'react-froala-wysiwyg';
// import 'froala-editor/js/plugins/markdown.min.js';
// import './index.css';

import { Tokenizer, marked, options, use } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/felipec.css';
import markedKatex from "marked-katex-extension";
import * as S from './style';
import Footer from '../Footer/Footer';


export const PageEditTabContentEditor = ({parentMatch}) => {
  const { titleRef, statusRef, contentRef } = useOutletContext();
  const [title, setTitle] = useState(titleRef.current);
  const location = useLocation();
  const navigate = useNavigate();
  /* T1 只关注title部分, 以及当前page的状态 */
  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value);
  //   titleRef.current = e.target.value;
  // }
  useEffect(() => {
    // console.log('titleref is', titleRef);
    if(parentMatch === '') {
      navigate(location.pathname+'/editor');
      // window.history.replaceState({}, '', location.pathname+'/editor');
    }
  }, []);

  const EditorBlogTitle = ({ statusRef, titleRef }) => {
    /* T4 只关注title以及状态 */
    const [status, setStatus] = useState(statusRef.current);
    const [title, setTitle] = useState(titleRef.current);

    const handleStatusChange = (e) => {
      setStatus(e.target.value);
      statusRef.current = e.target.value;
    }

    const handleTitleChange = (e) => {
      setTitle(e.target.value);
      titleRef.current = e.target.value;
    }

    return (
      <S.EditorTools>
        <div className='editor-tools-title-container'>
          <span>
            Title
          </span>
          <input
            className='edit-title'
            type='text'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className='editor-tools-status-container'>
          <span>
              Status
          </span>
          <select value={status} onChange={handleStatusChange}>
            <option value='draft'>draft</option>
            <option value='private'>private</option>
            <option value='published'>published</option>
          </select>
        </div>
      </S.EditorTools>
    );
  };

  const EditorBlogContent = ({ contentRef }) => {
    const [text, setText] = useState(contentRef.current);
    // const [content, setContent] = useState(contentRef.current);
    const textareaRef = useRef(null);

    const handleTextChange = (e) => {
      setText(e.target.value);
      contentRef.current = e.target.value;
    }

    useEffect(() => {
      // console.log('T3 mount...');
    }, []);

    useEffect(() => {
      // console.log('T3 render...');
    });

    useEffect(() => {
      if(textareaRef.current) {
        textareaRef.current.style.height = '0px';
        const height = textareaRef.current.scrollHeight;
        const computedStyle = window.getComputedStyle(textareaRef.current);
        const paddingTop = parseFloat(computedStyle.paddingTop);
        const paddingBottom = parseFloat(computedStyle.paddingBottom);
        const newHeight = height - paddingTop - paddingBottom;
        textareaRef.current.style.height = `${newHeight}px`;
      }
    }, [text]);

    /* T3与T1在一个TAB下显示, 但是T3只关注body部分 */
    return (
      <S.MarkdownEditor>
        <textarea 
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            // onInput={()=>{this.parentNode.dataset.replicatedValue = this.value}}
            rows={1}
        />
      </S.MarkdownEditor>
    );
  };


  return (
    <S.TabContentEditor>
      {/* <span>T1....</span> */}
      <EditorBlogTitle statusRef={statusRef} titleRef={titleRef}></EditorBlogTitle>
      {/* <br/> */}
      {/* <input type='text' value={title} onChange={handleTitleChange} placeholder='title...'/> */}
      {/* <br/> */}
      <EditorBlogContent contentRef={contentRef}></EditorBlogContent>
    </S.TabContentEditor>
  );
};

export const PageEditTabContentPreviewer = () => {
  const { contentRef, titleRef } = useOutletContext();
  const previewRef = useRef(null);
  // const [content, setContent] = useState(contentRef.current);
  // const handleContentChange = (e) => {
  //   setContent(e.target.value);
  //   contentRef.current = e.target.value;
  // }
  /* T2 只关注page的预览 */

  useEffect(() => {
    marked.use(markedKatex({throwOnError: false}));
      // marked.use(gfmHeadingId({prefix: undefined}));
      marked.use({
        renderer: {
          code (code, lang, info) {
              // console.log('code is...');
              // console.log(code);
              const language = hljs.getLanguage(lang) ? lang : 'plaintext';
              // console.log(hljs.highlight(code, { language }));
              return `<pre><code class="language-${language} hljs" data-highlighted="yes">${hljs.highlight(code, { language }).value}</code></pre>`;
          },
          image (href, title, text) {
              const percent = (title && parseInt(title, 10)) || 100;
              const resize = (percent > 100 || percent < 5) ? 100: percent;
              const ret = `<img class="resized" srcset="${href} ${100/resize}x" alt="${text}"/>`;
              // console.log(ret);
              return ret;
              // console.log('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
              // return ('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
          },
          codespan (code) {
              return `<code class=codespan>${code}</code>`;
              // console.log('code span is, ', code);
          },
          heading (text, level, raw) {
            // console.log('raw', raw);
            // console.log('level', level);
            if (level <= 2) {
              const anchor = raw.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
              return `<h${level} id="${anchor}">${text}</h${level}>\n`;
            } else {
              return `<h${level}>${text}</h${level}>\n`;
            }
          }
      }});
      // 以上部分可以考虑持久化?
    // console.log(contentRef.current);
    // console.log('called');
    const markdownText = `# ${titleRef.current}\n${contentRef.current}`;
    const parsedContent = marked.parse(markdownText);
    document.querySelector('#BlogContent').innerHTML=parsedContent;
    // previewRef.innerHTML = parsedContent;
  }, []);

  return (
    <div id='BlogContent' ref={previewRef}>
    </div>
  );
};

const NewPageEdit = () => {
    // pageId maybe undefined
    const { pageId, wildcard } = useParams();
    const navigate = useNavigate();
    // const info = { isUnmounted: false};
    const [isMounted, setIsMounted] = useState(false);
    const user = useSelector(state => state.auth?.user);
    const [unauthorized, setUnauthorized] = useState(false);
    // console.log('page id is...', pageId);
    // console.log(pageId);
    // const { state } = useLocation();
    // const [value, setValue] = useState((state.new_page && state.pageData.content) || '');
    // const [title, setTitle] = useState((state.new_page && state.pageData.title) || '');
    // const [pageData, setPageData] = useState({});
    // const [title, setTitle] = useState('');

    const titleRef = useRef('');
    const statusRef = useRef('');
    const contentRef = useRef('');

    // const locationRef = useRef('edit');
    const editorTabRef = useRef(null);
    const previewerTabRef = useRef(null);
    // const currentTab = useRef('edit');

    
    // const location = useLocation();
    // const pathSegments = location.pathname.split('/');
    // const relativePath = pathSegments[pathSegments.length-1]||'';
    // useEffect(() => {
    //   console.log('relative path is: ', relativePath);
    // });
    // const displaytype = location.pathname === ''

    // const [content, setContent] = useState('');

    // const handleContentChange = (value) => {
    //     setPageData({content: value});
    // };

    const handleSubmit = async () => {
      // console.log('title is', titleRef.current);
      // console.log('status is', statusRef.current);
      // return;
        if (pageId) {
          // 更新
            try {
              // console.log('new status', statusRef.current);
              const msg = await PageService.updatePageById(pageId, {
                title: titleRef.current,
                content: contentRef.current,
                status: statusRef.current,
              });
                // const msg = await PageDataService.updatePageById(pageId,{ title, content });
            } catch (err) {
              // console.log('---------------------');
              // console.log(err);
              console.log((err.message || 'Error occurred') + ' ' + ((err.response.data && err.response.data.message) || ''));
                // console.log((err.response.data && err.response.data.message) ||  err.message || 'Error occurred.');
            }
            // 可以从Redux中抽取实际的用户名, 这里设置为空不影响实现效果
            // 如果page的状态为publised, 直接跳转到页面没有问题
            // 如果page的状态为private/draft, 应该跳转到用户的page-list页面, 
            // 这时我们可以合适地假设用户已经处于登录状态*
            navigate(`/pages/@${user?.username}/${pageId}`);
            // navigate(`/postedit`);
        } else {
          // 添加
            try {
                // const res = await PageDataService.createPage({
                //     author: 'pandoxone', title, content
                // });
                console.log('title Ref is ', titleRef.current);
                console.log('contnet ref is ', contentRef.current);
                const res = await PageService.createPage({
                  title: titleRef.current, content: contentRef.current,
                });
                // console.log(res);
                navigate(`/pages/@${res.data.author}/${res.data.id}`);
                // navigate(`/postedit`);
            } catch (err) {
                console.log(err.message || 'Error occurred.');
            }
            // 创建新页面的情况下, 用户一定处于登录状态, 我们可以使用可更新同样的策略
        }
        // console.log('title is', title);
        // console.log('value is', value);
    };

    const getTitle = async (info) => {
      // let isMounted = true;
      try {
        // console.log('get title...');
          // const res = await PageDataService.getPageById(pageId);
          const res = pageId ? (await PageService.getPageById(pageId)) : null;
          // console.log('isMounted', info.isMounted);
          if (!info.isUnmounted) {
            // setTitle(res.data.title);
            titleRef.current = res?.data.title || '';
            statusRef.current = res?.data.status || '';
            contentRef.current = res?.data.content || '';
            // console.log('REF', titleRef);
            // setContent(res.data.content);
            // info.isMounted = true;
            setIsMounted(true);
          }
          return res;
          // setPageData(res.data);
      } catch (err) {
          console.log(err.message || 'Error occurred.');
      }
    };

    useEffect(() => {
      // 如果没有登录, 直接跳转到登录界面
      if(!user) {
        navigate(`/login`);
        return;
      }
    }, [user]);

    useEffect(() => {
        // if (pageId) {
          // if (wildcard !== 'p') {
          //   const newUrl = `/p/${pageId}/edit`;
          //   window.history.replaceState({}, document.title, newUrl);
          // }
          // let info = {isMounted: true};
          const info = { isUnmounted: false};
          // console.log('wildcard', wildcard);
          // window.history.replaceState({}, document.title, newUrl);
          getTitle(info).then((res) => {
            if(user && res &&  (res.data.author !== user.username)) {
              // console.log(res?.data.author);
              // console.log(user);
              setUnauthorized(true);
            }
          }).catch((err) => {

          });
          return () => {
            // console.log('unmount called');
            // info.isMounted = false;
            info.isUnmounted = true;
            // info.isMounted = false;
          };
        // }
        // pageId && getTitle();
        // return () => {
        //    setTitle('');
        //    setContent('');
        // };
    }, []);


    const StatusBar = () => {
      return (
        <div>
            <span>status</span>
            <span>|</span>
            <span>title</span>
        </div>
      );
    };

    const handleEditorTabOnClickx = (e) => {
      // console.log(e.target.classList);
      // console.log('target classlist', e.target.classList);
      // editorTabRef.current.classList.remove('selected');
      // previewerTabRef.current.classList.remove('selected');
      // e.target.classList.add('selected');
      // if(e.target.classList.contains('preview')) {
      //   currentTab.current = 'preview';
      // }else{
      //   currentTab.current = 'edit';
      // }
      // console.log('current tab: ', currentTab.current);
    };

    const EditorHeader = () => {
      const lastScrollTopRef = useRef(0);
      const [scrollDirection, setScrollDirection] = useState(null);
      useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          if (scrollTop > lastScrollTopRef.current) {
            setScrollDirection('down');
            // console.log('down');
            // scrollDirectionRef.current = 'down';
          } else if(scrollTop > .35 * window.innerHeight){
            setScrollDirection('up');
            // console.log('up');
            // scrollDirectionRef.current = 'up';
          }
          lastScrollTopRef.current = scrollTop <= 0 ? 0 : scrollTop;
        }
        window.addEventListener('scroll', handleScroll);
        // console.log('isloggedin is', isLoggedIn);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
      }, []);

      return (
        <S.EditHeaderContainer scroll={scrollDirection}>
          <div className='edit-header'>
            <NavLink to='./editor' className='edit'>Editor</NavLink>
            <NavLink to='./previewer' className='preview'>Previewer</NavLink>
            <button className='editor-tab-submit' onClick={handleSubmit}>Submit</button>
          </div>
        </S.EditHeaderContainer>
      );
    };

    return (
      <div>
        <NavBar displaytype='secondary'></NavBar>
        {unauthorized ? (<S.EditContainer><h1>Unauthorized.</h1></S.EditContainer>) :
          (isMounted && (
          <S.EditContainer>
            <EditorHeader/>
            <S.EditorContainer>
              {/* <StatusBar/> */}
              {/* <span>Title</span> */}
              {/* <input type='text' value={title} onChange={handleTitleChange} placeholder='title'/> */}
              {/* <span>Content</span> */}
              {/* <button onClick={handleSubmit}>Submit</button> */}
              {/* <div className='editor-tabs'> */}
              {/* </div> */}
              <Outlet context={{titleRef, statusRef, contentRef}}/>
            </S.EditorContainer>
          </S.EditContainer>) || (
        <S.EditorContentLoading/>))}
        <Footer/>
      </div>
    );
};

export default NewPageEdit;