import { Decoration, WidgetType, EditorView } from '@codemirror/view';
import { RangeSet, StateField } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';

import markdoc from '@markdoc/markdoc';

import markedKatex from 'marked-katex-extension';
import { marked } from 'marked';

import type { Config } from '@markdoc/markdoc';
import type { DecorationSet } from '@codemirror/view'
import type { EditorState, Range } from '@codemirror/state';
// import { Tag } from '@lezer/highlight';
import Tag from '@markdoc/markdoc';

const patternTag = /{%\s*(?<closing>\/)?(?<tag>[a-zA-Z0-9-_]+)(?<attrs>\s+[^]+)?\s*(?<self>\/)?%}\s*$/m;
marked.use(markedKatex({ throwOnError: false }));

class RenderInlineLatexWidget extends WidgetType {
  rendered: string;

  constructor(public source: string, config: Config) {
    super();

    // console.log('source is', source);
    const document = markdoc.parse(source);
    // console.log('DOC is', document);
    let tar = document.children[0];
    while(tar && !(tar.type === 'text' && tar.attributes?.content)){
      tar = tar.children[0];
    }
    // console.log('tar is ', tar);
    if(tar) {
      tar.tag = 'inline_latex';
    }
    // document.children[0].tag = 'inline-atex';
    // console.log('document is', document);
    // document.children[0].tag = 'inline-latex';
    // console.log('inline latex, source is ', source);
    
    // console.log('call transform');
    // console.log('docu', document);
    const transformed = markdoc.transform(document, config);
    
    // console.log('transformed', transformed);
    // console.log(document.tag);
    // if(document.tag){
    //   console.log('source', source);
    //   console.log('document', document);
    // }
    this.rendered = markdoc.renderers.html(transformed);
    // console.log('rendered', this.rendered);
    const temp = marked.parseInline(source);
    // console.log('compare', marked.parse(source));
    const compare = marked.parse(source);
    // console.log('marked parse', marked.parse(source));
    // console.log('temp is', temp);
    this.rendered = temp as string;
    // this.rendered = compare as string;
    // console.log('out constructor');
  }

  eq(widget: RenderBlockWidget): boolean {
    return widget.source === widget.source;
  }

  toDOM(): HTMLElement {
    // console.log('to dom called');
    let content = document.createElement('span');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderInline';
    content.innerHTML = this.rendered;
    // content.outerHTML = this.rendered;
    return content;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

class RenderBlockImageWidget extends WidgetType {
  rendered: string;

  constructor(public source: string, config: Config) {
    super();

    // console.log('source is', source);
    const document = markdoc.parse(source);
    // 需要找到缩放系数，如果有
    // console.log('document is', document);
    // document.children[0].tag = 'block_image';
    
    // console.log('call transform');
    // console.log('docu', document);
    // console.log('block img, source is ', source);
    const transformed = markdoc.transform(document, config);
    
    // console.log('transformed', transformed);
    // console.log(document.tag);
    // if(document.tag){
    //   console.log('source', source);
    //   console.log('document', document);
    // }
    // const tar = transformed as Tag<string, Record<string, any>>;
    // while(tar&& tar?.name !== 'img'){
    // }
    this.rendered = markdoc.renderers.html(transformed);
    const regex = /<img\s+[^>]*src="([^"]+)"(?:[^>]*alt="([^"]*)")?(?:[^>]*title="([^"]*)")?[^>]*>/;
    const match = this.rendered.match(regex);
    if(match) {
      const src = match[1];
      const alt = match[2] || 'No alt';
      const title = match[3] || '100';
      // console.log('src:', src);     // 输出: http://l461-bfea-019773af6767.jpeg
      // console.log('alt:', alt);     // 输出: No alt
      // console.log('title:', title); // 输出: No title
      const precent = parseInt(title);
      const resize = precent > 100 || precent < 5 ? 100:precent;
      const ret = `<img class="resized" srcset="${src} ${100/resize}x" alt="${alt}"/>`;
      this.rendered = '<article><p>' + ret + '</p></article>';
    }
    // console.log('rendered', this.rendered);
    // console.log('marked parse', marked.parse(source));
    // this.rendered = marked.parse(source) as string;
    // console.log('out constructor');
  }

  eq(widget: RenderBlockWidget): boolean {
    return widget.source === widget.source;
  }

  toDOM(): HTMLElement {
    // console.log('to dom called');
    let content = document.createElement('div');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderBlockImage';
    content.innerHTML = this.rendered;
    return content;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

class RenderLatexWidget extends WidgetType {
  rendered: string;

  constructor(public source: string, config: Config) {
    super();

    // console.log('source is', source);
    const document = markdoc.parse(source);
    // console.log('document is', document);
    document.children[0].tag = 'latex';
    
    // console.log('call transform');
    // console.log('docu', document);
    // console.log('block latex, source is ', source);
    const transformed = markdoc.transform(document, config);
    
    // console.log('transformed', transformed);
    // console.log(document.tag);
    // if(document.tag){
    //   console.log('source', source);
    //   console.log('document', document);
    // }
    this.rendered = markdoc.renderers.html(transformed);
    // console.log('rendered', this.rendered);
    // console.log('marked parse', marked.parse(source));
    this.rendered = marked.parse(source) as string;
    // console.log('out constructor');
  }

  eq(widget: RenderBlockWidget): boolean {
    return widget.source === widget.source;
  }

  toDOM(): HTMLElement {
    // console.log('to dom called');
    let content = document.createElement('div');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderBlock';
    content.innerHTML = this.rendered;
    return content;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

class RenderBlockWidget extends WidgetType {
  rendered: string;

  constructor(public source: string, config: Config) {
    super();

    // console.log('++source is', source);
    const document = markdoc.parse(source);
    const transformed = markdoc.transform(document, config);
    
    // console.log('transformed', transformed);
    this.rendered = markdoc.renderers.html(transformed);
    // const compare = marked.parse(source);
    // console.log('rendered', this.rendered);
    // this.rendered = compare as string;
    // console.log('out constructor');
  }

  eq(widget: RenderBlockWidget): boolean {
    return widget.source === widget.source;
  }

  toDOM(): HTMLElement {
    // console.log('to dom called');
    let content = document.createElement('div');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderBlock';
    content.innerHTML = this.rendered;
    return content;
  }

  ignoreEvent(): boolean {
    return false;
  }
}

function replaceBlocks(state: EditorState, config: Config, from?: number, to?: number) {
//   console.log('RB callend');
  const decorations: Range<Decoration>[] = [];
  const [cursor] = state.selection.ranges;

  const tags: [number, number][] = [];
  const stack: number[] = [];
  const latex_stk: number[] = [];

  syntaxTree(state).iterate({
    enter(node) {
    //   console.log(node.name);
      // console.log('enter');
      if (!['Table', 'Blockquote', 'MarkdocTag',
       'BlockLatexTag', 'LaTeXBlock', 'InlineLaTeX', 'BlockImage'].includes(node.name))
        return;
      
        // console.log(node.name);
      if (node.name === 'MarkdocTag') {
        const text = state.doc.sliceString(node.from, node.to);
        // console.log('text is', text);
        const match = text.match(patternTag);
        // console.log('match is ', match);

        // if (match?.groups?.self) {
        //   tags.push([node.from, node.to]);
        //   return;
        // }

        if (match?.groups?.closing) {
          const last = stack.pop();
          // console.log('last is ', last);
          if (last) tags.push([last, node.to]);
          return;
        }

        stack.push(node.from);
        return;
      }else if(node.name === 'BlockLatexTag'){
        // console.log('here...');
        const text = state.doc.sliceString(node.from, node.to);
        // console.log('text is', text);
        // return;
        // const last = latex_stk.pop();
        // if(last){
        //   tags.push([last, node.to]);
        // }
        // latex_stk.push(node.from);
        // return;
      }else if(node.name === 'LaTeXBlock'){
        const text = state.doc.sliceString(node.from, node.to);
        // console.log('text is ', text);
        // console.log(node.from, node.to);
      }else if(node.name === 'InlineLaTeX'){
        const text = state.doc.sliceString(node.from, node.to);
        // console.log('text is ', text);
        // console.log('isblock IS', node.name !== 'InlineLaTeX');
      }else if(node.name === 'FencedCode'){
        const text = state.doc.sliceString(node.from, node.to);
        // console.log('text is ', text);
      }

      if (cursor.from >= node.from && cursor.to <= node.to)
        return false;

      const text = state.doc.sliceString(node.from, node.to);
      // console.log('TEXT', text);
      // console.log('isBlock')
      const decoration = Decoration.replace({
        widget: (node.name === 'LaTeXBlock' && 
        new RenderLatexWidget(text, config)) 
        || (node.name === 'InlineLaTeX' && 
        new RenderInlineLatexWidget(text, config)) 
        || (node.name === 'BlockImage' && 
        new RenderBlockImageWidget(text, config)) 
        ||  new RenderBlockWidget(text, config),
        block: node.name !== 'InlineLaTeX',
      });
      if(node.name === 'InlineLaTeX'){
        // console.log(decoration);
      }

      decorations.push(decoration.range(node.from, node.to));
    }
  });

//   console.log('MID');

  for (let [from, to] of tags) {
    if (cursor.from >= from && cursor.to <= to) continue;
    const text = state.doc.sliceString(from, to);
    const decoration = Decoration.replace({
      widget: new RenderBlockWidget(text, config),
      block: true,
    });

    decorations.push(decoration.range(from, to));
  }
  // console.log(decorations);
//   console.log('RB end');
  return decorations;
  
}

export default function (config: Config) {
  return StateField.define<DecorationSet>({
    create(state) {
      return RangeSet.of(replaceBlocks(state, config), true);
    },

    update(decorations, transaction) {
      return RangeSet.of(replaceBlocks(transaction.state, config), true);
    },

    provide(field) {
      return EditorView.decorations.from(field);
    },
  });
}