import MDEditor from '@uiw/react-md-editor';
import React, { useState, useEffect, useRef} from 'react';
import { getCodeString } from "rehype-rewrite";
// import katex from "katex";
// import "katex/dist/katex.css";
import MarkdownPreview from '@uiw/react-markdown-preview';
// import RemarkMathPlugin from 'remark-math';
// import { BlockMath, InlineMath } from 'react-katex';
import rehypeSanitize from "rehype-sanitize"

import { Tokenizer, marked, options, use } from 'marked';
import hljs from 'highlight.js';
// import 'highlight.js/styles/arduino-light.css';
// import 'highlight.js/styles/vs2015.css';
// import 'highlight.js/styles/github-dark.css';
import 'highlight.js/styles/felipec.css';
import markedKatex from "marked-katex-extension";
// import { getHeadingList, gfmHeadingId } from "marked-gfm-heading-id";


import NavBar from '../../components/NavBar';
import Footer from '../Footer/Footer';


import avatar from '../../static/user_icon.jpeg';
import PageCommentMain from './PageCommentMain';

// import PageDataService from '../../services/page.service';
import { PageService, PageKeywordService } from '../../services/data';
import { useNavigate, useParams } from 'react-router-dom';

// import './page_main.css';
import './index.css';
import { click } from '@testing-library/user-event/dist/click';
import * as S from './style';

import { useSelector } from 'react-redux';

const PageMain = () => {
    const { pageId } = useParams();
    const [pageData, setPageData] = useState({});
    const [keywords, setKeywords] = useState([]);
    const user = useSelector(state => state.auth?.user);
    const commentRef = useRef(null);
    // const pageDataRef = useRef();
    // pageDataRef.current = pageData;
    // let xyz = 0;
    // const [v, setV] = useState(0);
    // console.log(pageId, userId);
    // const [isPreview, setIsPreview] = useState(true);
    // const [id, setId] = useState(-1);
    // const [author, setAuthor] = useState('');
    // const [title, setTitle] = useState('loading...');
    // const [content, setContent] = useState(
    // `
    // The concept of "strongly connected components" (SCCs) is analogous to connected components in an undirected graph.

    // The relationship $R$ defined by "mutual reachability" in a directed graph is an equivalent relationship. Each set from the partition induced by $R$ is referred to as a strongly connected component (SCC).
    // `);
    const navigate = useNavigate();

    const addListener = (selector, type, listener) => {
        const element = document.querySelector(selector);
        element && element.addEventListener(type, listener);
    };

    const getKeywords = async () => {
      try {
        const _keywords = await PageKeywordService.getKeywordsByPageId(pageId);
        // console.log('KEYWORDS', _keywords);
        setKeywords(_keywords.data);
      } catch(err) {
        console.log('error occurred while getting keywords...');
      }
    };

    const editSpanOnClick = () => {
        console.log('edit clicked...xxx');
        // pageData.id && navigate(`/p/${pageData.id}/edit`,
        //  { state: { new_page: false,  pageData} });
        pageData.id && navigate(`/p/${pageData.id}/edit`);
        // console.log('xyz is ', xyz);
        console.log(pageData);
        // console.log(pageDataRef.current);
        // console.log(pageData.id);

        // if(pageData.id) {
        //     console.log('--->>>');
        //     // navigate(`/p/${pageData.id}/edit`);
        // }
    };

    

    useEffect(() => {
      // console.log('---->>>');

      const handleTocClick = (e) => {
        // console.log(e.target);
        // console.log(e.target.class);
        // console.log(e.target.href);
        // console.log(this.href);
        // console.log(e.target.getAttribute('href'));
        e.preventDefault();
        // console.log('++++');
        const headerEle = document.getElementById(e.target.getAttribute('href').slice(1));
        // console.log(e.target.getAttribute('href').slice(1));
        // console.log(headerEle);
        if (headerEle) {
          // console.log('----');
          // const oneEm = parseFloat(getComputedStyle(document.documentElement).fontSize);
          // const offset = 10;
          // const scrollTo = headerEle.offsetTop - offset * oneEm;
          headerEle.scrollIntoView({
            // top: scrollTo,
            block: 'center',
            behavior: 'smooth', // 使用平滑滚动效果 or 'auto'立即滑到
          });
        }
        // console.log('clicked');
      };

      let parseInfo = {
        ignored: false,
      };

      const getTitle = async () => {
        // console.log(123);
        // console.log(pageId);
        // await setTimeout(()=> {
        //   console.log('cur toc is\n', toc);
        // }, 3000);
        const generateTOC = (toc) => {
          // console.log('toc is....\n');
          // console.log(toc);
          const build = (coll, k, level, ctx) => {
            if (k >= coll.length || coll[k].depth <= level) { return k; }
            let node = coll[k];
            const anchor = node.text.toLowerCase().replace(/[^\w\\u4e00-\\u9fa5]]+/g, '-');
            // <li><a href='#title' onClick={handleClick}>title</a>
            const pattern = `<li><a class='linktoc' href='#${anchor}'>${node.text+''}</a>`;
            ctx.push(pattern);
            k++;
            let childCtx = [];
            k = build(coll, k, node.depth, childCtx);
            if (childCtx.length > 0) {
                ctx.push("<ul>");
                childCtx.forEach(function (idm) {
                    ctx.push(idm);
                });
                ctx.push("</ul>");
            }
            ctx.push("</li>");
            k = build(coll, k, level, ctx);
            return k;
          }
          let ctx = [];
          ctx.push('<div id="Toc-Title">Table of Contents</div>\n<ul>');
          build(toc, 0, 0, ctx);
          ctx.push('</ul>');
          // console.log(ctx);
          return ctx.join('');
        };
        try {
            // const res = await PageDataService.getPageById(pageId);
            const res = await PageService.getPageById(pageId);
            await getKeywords();
            // console.log('title is' , res.data.title);
            // console.log('ignord ', parseInfo.ignored);
            // setTimeout(1000, ()=>{});
            // const parsedContent = (!parseInfo.ignored) ? marked.parse(res.data.content): '';
            // console.log('<<');
            // logInfo();
            // console.log('toc is', parseInfo.toc);
            
            // console.log('==');
            // logInfo();
            // console.log('ignord ', parseInfo.ignored);
            // console.log('rec ignored', parseInfo.ignored);
            if (!parseInfo.ignored) {
              const newUrl = `/pages/@${res.data.author}/${res.data.id}`;
              const parsedContent = marked.parse(res.data.content);
              // console.log('+++***');
              // console.log(X);
            //   console.log(parsedToc);
            //   console.log(parsedContent);
              const headings = marked.lexer(res.data.content).filter(
                token => (token.type === 'heading' && token.depth <= 2)
              );
              console.log(headings);
              const parsedTOC = generateTOC(headings);
              // 用户提供的wildcard, 未必是真正的username
              // 不刷新页面的情况下更改url
              window.history.replaceState({}, document.title, newUrl);
              setPageData(res.data);
              console.log('title is', pageData.title);
              console.log('res.data is ', res.data);
              document.querySelector('#BlogContent').innerHTML = parsedContent;
            // // console.log('rec ignored', parseInfo.ignored);
              document.querySelector('#BlogTableofContents').innerHTML = parsedTOC;
              // console.log(document.querySelectorAll('li>a.linktoc'));
              for (let item of document.querySelectorAll('li>a.linktoc')) {
                // console.log(item);
                item.addEventListener('click', handleTocClick);
              }
            }
        } catch (err){
            console.log(err.message || 'Error occurred.');
        }
    };
    // const logInfo = () => {
    //   console.log(parseInfo);
    // };
      // let ignored = false;
      // let toc = [];
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
              console.log(ret);
              // console.log("title is ", title);
              return ret;
              // console.log('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
              // return ('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
          },
          codespan (code) {
              return `<code class=codespan>${code}</code>`;
              console.log('code span is, ', code);
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
      getTitle(parseInfo);
      // const tocEle = document.querySelector('#BlogTableofContents');
      // const scrollThreshold = tocEle.getBoundingClientRect().top;
      // const handleTocScroll = () => {
      //   const offset = window.scrollY;
      //   const dist2top = tocEle.getBoundingClientRect().top;
      //   const viewportHeight = window.innerHeight;
      //   // less than 50px
      //   // if (tocEle.className = 'normal' && dist2top <= 0.1*viewportHeight) {
      //   //   // console.log('change to sticky');
      //   //   tocEle.className = 'sticky';
      //   //   // tocEle.style.position = 'fixed';
      //   //   // tocEle.style.top = 0.1*viewportHeight;
      //   //   // tocEle.style.top = 0;
      //   // }else if(tocEle.className = 'sticky' && offset){
      //   //   // console.log('change to normal');
      //   //   tocEle.className = 'normal';
      //   //   // tocEle.style.position = 'absolute';
      //   //   // tocEle.style.top = 0;
      //   // }
      // };

      if(!parseInfo.ignored){
        const tocEle = document.querySelector('#BlogTableofContents');
        const tocPar = document.querySelector('#BlogTableofContentsContainer');
        const scrollThreshold = document.querySelector('#BlogContent').getBoundingClientRect().top;
        const tocWidth = tocPar.getBoundingClientRect().width;
        // console.log('toc width is', tocWidth);
        // console.log('sc th', scrollThreshold);
        // console.log('height ', window.innerHeight);
        // console.log('title top', document.querySelector('#BlogTitle').getBoundingClientRect().top);
        // console.log('author top', document.querySelector('#BlogAuthorInfoBar').getBoundingClientRect().top);
        // console.log('thred2', document.querySelector('#BlogContent').getBoundingClientRect().top + document.querySelector('#BlogContent').getBoundingClientRect().height);
        parseInfo.handleTocScroll = () => {
          const scrollThreshold2 = document.querySelector('#BlogContent').getBoundingClientRect().top + document.querySelector('#BlogContent').getBoundingClientRect().height;
          // const navbarHight = document.querySelector('#navbar').getBoundingClientRect().height;
          const tmp2 = tocPar.getBoundingClientRect().top+tocPar.getBoundingClientRect().height - tocEle.getBoundingClientRect().height;
          const tmp3 = tocPar.getBoundingClientRect().height+tocPar.getBoundingClientRect().top;
          const tmp4 = tocPar.getBoundingClientRect().top;
          // console.log('tmp4==>',tmp4);
          const navbarHight = window.innerHeight * 0.1;
          const offset = window.scrollY;
          const tmp5 = -tocPar.getBoundingClientRect().height+navbarHight+tocEle.getBoundingClientRect().height;
          // console.log('tmp5===>', tmp5);
          if(tmp4 >= navbarHight){
            tocEle.className = 'normal';
          }else if(tmp4 >= -tocPar.getBoundingClientRect().height+navbarHight+tocEle.getBoundingClientRect().height){
            tocEle.className = 'sticky';
            // tocEle.style.width = tocWidth + 'px';
          }else{
            tocEle.className = 'restore';
            // tocEle.style.width = tocWidth + 'px';
          }
          // if(offset >= tocPar.getBoundingClientRect().height+tocPar.getBoundingClientRect().top){
          //   tocEle.className = 'restore';
          // } else if(offset >= scrollThreshold - navbarHight){
          //   tocEle.className = 'sticky';
          //   tocEle.style.width = tocWidth + 'px';
          // }else{
          //   tocEle.className = 'normal';
          // }
        };
        window.addEventListener('scroll', parseInfo.handleTocScroll);
      }
      return () => {
        parseInfo.ignored = true;
        for (let item of document.querySelectorAll('li>a.linktoc')){
          item.removeEventListener('click', handleTocClick);
        }
        parseInfo.handleTocScroll && window.removeEventListener('scroll', parseInfo.handleTocScroll);
        // parseInfo.toc = [];
        // console.log('clear');
      };
    }, []);

    const handleBlogAuthorOnClick = (e) => {
      e.preventDefault();
      navigate(`/users/@${pageData?.author}`);
    };

    return (
        <div>
            <NavBar displaytype='secondary'></NavBar>
            <S.BlogMain>
              { true || (pageData.status && (pageData.status !== 'published')) ? (
              <div className='BlogMainAlert'>Note current status for this post is {pageData.status}, only you can view this page.</div>
              ) : null }
                <div className='BlogTitle'>
                    <h1>{ pageData.title }</h1>
                </div>
                <div className='BlogTitleLabel'>
                    <div className='BlogTitleLabelDates'>
                        <span className='Blog-Title-Label-Date'>
                            Created: {new Date(pageData.createdAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        }) || ''}
                        </span>
                        <span className='Blog-Title-Label-Date'>
                            Modified: {new Date(pageData.updatedAt).toLocaleString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        }) || ''}
                        </span>
                    </div>
                    <div className='BlogTitleLabelKeywords'>
                        <span className='Title-Label-Button'>Keywords:</span>
                        {keywords.map((keyword, index) => (<span key={index} className='Title-Label-Button'>{keyword.keyword}</span>))}
                    </div>
                </div>
                <div className='BlogAuthorInfoBar'>
                    <div className='Avatar-Container'>
                        <img src={pageData.avatar} alt='avatar' className='Avatar'></img>
                    </div>
                    <span className='BlogAutherInfoUsername'
                      onClick={handleBlogAuthorOnClick}>
                        {pageData.author || ''}
                    </span>
                </div>
                <div className='BlogContentContainer'>
                  <div id='BlogContent'>
                      {/* <MDEditor.Markdown source={pageData.content} {...previewOptions}/> */}
                      {/* <MDEditor.Markdown source={`\`$$R$$\``} {...previewOptions}/> */}
                      {/* <MarkdownPreview source={`\`$$R$$\``} {...previewOptions}></MarkdownPreview> */}
                      {/* <MDEditor.Markdown source={`\`$$R$$\``} components={{code: ()=>(<code>`123`</code>)}}/> */}
                      {/* <MDEditor value={value} onChange={setValue} previewOptions={previewOptions}></MDEditor> */}
                  </div>
                  {(
                    <div id='BlogTableofContentsContainer'>
                      <div id='BlogTableofContents' className='normal'>
                      </div>
                    </div>
                  )}
                </div>
                <div id='BlogOpsContainer'>
                  <button>Like </button>
                  {/* <span id='BlogOps-Edit'>Edit </span> */}
                  {user && pageData && user.username === pageData.author && (<button id='BlogOps-Edit' onClick={editSpanOnClick}>Edit </button>)}
                  <button onClick={() => {commentRef.current?.handleCommentOnClick();}}>Comment </button>
                </div>
                <PageCommentMain ref={commentRef}></PageCommentMain>
            </S.BlogMain>
            <Footer></Footer>
        </div>
    );
};

export default PageMain;