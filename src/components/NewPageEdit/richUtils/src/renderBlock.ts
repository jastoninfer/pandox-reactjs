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

    const document = markdoc.parse(source);
    let tar = document.children[0];
    while(tar && !(tar.type === 'text' && tar.attributes?.content)){
      tar = tar.children[0];
    }
    if(tar) {
      tar.tag = 'inline_latex';
    }
    const transformed = markdoc.transform(document, config);
    
    this.rendered = markdoc.renderers.html(transformed);
    const temp = marked.parseInline(source);
    const compare = marked.parse(source);
    this.rendered = temp as string;
  }

  eq(widget: RenderBlockWidget): boolean {
    return widget.source === widget.source;
  }

  toDOM(): HTMLElement {
    let content = document.createElement('span');
    content.setAttribute('contenteditable', 'false');
    content.className = 'cm-markdoc-renderInline';
    content.innerHTML = this.rendered;
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

    const document = markdoc.parse(source);
    const transformed = markdoc.transform(document, config);
    
    this.rendered = markdoc.renderers.html(transformed);
    const regex = /<img\s+[^>]*src="([^"]+)"(?:[^>]*alt="([^"]*)")?(?:[^>]*title="([^"]*)")?[^>]*>/;
    const match = this.rendered.match(regex);
    if(match) {
      const src = match[1];
      const alt = match[2] || 'No alt';
      const title = match[3] || '100';
      const precent = parseInt(title);
      const resize = precent > 100 || precent < 5 ? 100:precent;
      const ret = `<img class="resized" srcset="${src} ${100/resize}x" alt="${alt}"/>`;
      this.rendered = '<article><p>' + ret + '</p></article>';
    }
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

    const document = markdoc.parse(source);

    document.children[0].tag = 'latex';
  
    const transformed = markdoc.transform(document, config);
  
    this.rendered = markdoc.renderers.html(transformed);
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

    const document = markdoc.parse(source);
    const transformed = markdoc.transform(document, config);
    
    this.rendered = markdoc.renderers.html(transformed);
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

      if (!['Table', 'Blockquote', 'MarkdocTag',
       'BlockLatexTag', 'LaTeXBlock', 'InlineLaTeX', 'BlockImage'].includes(node.name))
        return;
      
      if (node.name === 'MarkdocTag') {
        const text = state.doc.sliceString(node.from, node.to);
        
        const match = text.match(patternTag);

        if (match?.groups?.closing) {
          const last = stack.pop();
          if (last) tags.push([last, node.to]);
          return;
        }

        stack.push(node.from);
        return;
      }else if(node.name === 'BlockLatexTag'){

        const text = state.doc.sliceString(node.from, node.to);

      }else if(node.name === 'LaTeXBlock'){
        const text = state.doc.sliceString(node.from, node.to);

      }else if(node.name === 'InlineLaTeX'){
        const text = state.doc.sliceString(node.from, node.to);

      }else if(node.name === 'FencedCode'){
        const text = state.doc.sliceString(node.from, node.to);
      }

      if (cursor.from >= node.from && cursor.to <= node.to)
        return false;

      const text = state.doc.sliceString(node.from, node.to);

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
      }

      decorations.push(decoration.range(node.from, node.to));
    }
  });

  for (let [from, to] of tags) {
    if (cursor.from >= from && cursor.to <= to) continue;
    const text = state.doc.sliceString(from, to);
    const decoration = Decoration.replace({
      widget: new RenderBlockWidget(text, config),
      block: true,
    });

    decorations.push(decoration.range(from, to));
  }
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