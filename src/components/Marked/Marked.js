import { Tokenizer, marked } from 'marked';
import markedKatex from "marked-katex-extension";
import { markedHighlight } from "marked-highlight";
import React, { useEffect, useState } from 'react';
import hljs from 'highlight.js';
// import "highlight.js/styles/github.css";
// import "./index.css";
// import 'highlight.js/styles/vs2015.css';
// import 'highlight.js/styles/arduino-light.css';

// import pygmentize from 'pygmentize-bundled';

const text = `
 $\sum_{i=3} = 2$

\`\`\`c
const highlight = "code";
int a = 7;
\`\`\`
`;

const doc = `
<pre><code class="hljs language-javascript">
<span class="hljs-keyword">const</span> highlight = <span class="hljs-string">&quot;code&quot;</span>;
</code></pre>
`;

const Marked = () => {
    const [inputText, setInputText] = useState('');
    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    useEffect(()=>{
        marked.use(markedKatex({throwOnError: false}));
        marked.use({ renderer: {
            code (code, lang, info) {
                // console.log('code is...');
                // console.log(code);
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                // console.log(hljs.highlight(code, { language }));
                return `<pre><code class="language-${language} hljs" data-highlighted="yes">${hljs.highlight(code, { language }).value}</code></pre>`;
            },
            image (href, title, text) {
                const percent = parseInt(title, 10);
                const resize = (percent > 100 || percent < 5) ? 100: percent;
                const ret = `<img class="resized" srcset="${href} ${100/resize}x" alt="${text}"/>`;
                console.log(ret);
                return ret;
                // console.log('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
                // return ('<img src="' + href + '" alt="' + text + '" ' + 'style={{ width: "50%", height: "auto" }}' + '>');
            },
            codespan (code) {
                return `<code class=codespan>${code}</code>`;
                console.log('code span is, ', code);
            }
        }});
    }, []);

    useEffect(()=>{
        // const tail = marked.parse(text);
        // console.log('tail is....');
        // console.log(tail);
        document.querySelector('#output').innerHTML
            = marked.parse(inputText);
        // console.log(hljs.highlightAuto('const highlight = &quot;code&quot;;'));
    }, [inputText]);

    // useEffect(()=> {
    //     // marked.use(markedKatex({throwOnError: false}));
    //     // document.querySelector('#output').innerHTML
    //     //     = marked.parse(`
    //     //     \`\`\`c
    //     //     const hightlight = "code";
    //     //     \`\`\`
    //     //     `);
    //     console.log('123');
    // }, [inputText])

    // useEffect(()=> {
    //     hljs.initHighlightingOnLoad();
    //     console.log(document.querySelector('#output').innerHTML);
    // });

    return (
        <div>
            <div>input text</div>
            <textarea value={inputText} onChange={handleInputChange} id='input'>
            </textarea>
            <div>output text</div>
            <div id='output'></div>
        </div>
    );
}

export default Marked;