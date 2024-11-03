import { tags as t } from '@lezer/highlight'
import type { MarkdownConfig } from '@lezer/markdown';

export default {
  defineNodes: [
    { name: 'MarkdocTag', block: true, style: t.meta },
    // { name: 'BlockLatexTag', block: true, style: t.meta},
    {name: 'LaTeXBlock', block: true},
    {name: 'InlineLaTeX', block: false},
    {name: 'BlockImage', block: true},
  ],
  parseInline: [
    {
      name: 'InlineImage',
      parse(cx, next, pos){
      
        if (cx.char(pos) === 33 && cx.char(pos + 1) === 91) {
          let altEnd = pos + 2;
          while(altEnd < cx.end && cx.char(altEnd) !== 93) {
            altEnd++;
          }
          if(altEnd < cx.end && cx.char(altEnd + 1) === 40) {
            let linkStart = altEnd + 2;
            let linkEnd = linkStart;
            while(linkEnd < cx.end && cx.char(linkEnd) !== 41){
              linkEnd++;
            }
            if(linkEnd > linkStart){
              const altText = cx.slice(pos + 2, altEnd);
              const link = cx.slice(linkStart, linkEnd);
              const element = cx.elt('InlineImage', pos, linkEnd + 1);
              cx.addElement(element);
              return linkEnd + 1;
            }
          }
        }
        return -1;
      }
    },
    {
      name: 'InlineLaTeX',
      parse(cx, next, pos){
        if(cx.char(pos) === 36 && (pos + 1) < cx.end && cx.char(pos + 1) !== 36) {
          let endPos = pos + 1;

          while(endPos < cx.end && cx.char(endPos) !== 36) {
            endPos++;
          }

          if(endPos > pos + 1 && endPos < cx.end) {
            const content = cx.slice(pos + 1, endPos);
            const element = cx.elt('InlineLaTeX', pos, endPos+1);
            cx.addElement(element);
            return endPos + 1;
          }
        }
        return -1;
      }
    }
  ],
  parseBlock: [
    {
      name: 'BlockImage',
      parse(cx, line) {
        const text = line.text.trim();
        if(text.startsWith('![')){
          let altEnd = text.indexOf(']');
          if(altEnd !== -1 && text[altEnd + 1] === '('){
            let linkStart = altEnd + 2; // skip ']('
            let linkEnd = text.indexOf(')', linkStart);
            if(linkEnd !== -1){
              const altText = text.slice(2, altEnd);
              const link = text.slice(linkStart, linkEnd);
              if(altText && link){
                cx.addElement(cx.elt('BlockImage', cx.lineStart, cx.lineStart + line.text.length));
                cx.nextLine();
                return true;
              }
            }
          }
        }
        return false;
      }
    },
    {
      name: 'LaTeXBlock',
      parse(cx, line) {
        if(line.text.startsWith('$$') && line.text.trim() === '$$'){
          let start = cx.lineStart;
          let _end = start + 1;
          let content = '';
          let sz = line.text.length;

          while(cx.nextLine()){
            let currentLine = line.text;
            if(currentLine.startsWith('$$') && currentLine.trim() === '$$'){
              
              const end = cx.lineStart + currentLine.length;
              cx.addElement(cx.elt('LaTeXBlock', start, end));
              cx.nextLine();
              return true;
            }else{
              if(currentLine.trim() === ''){
                return false;
              }
              content += currentLine + '\n';
              sz += currentLine.length;
            }
          }
          return false;
        }
        return false; 
      }
    },
    {
    name: 'MarkdocTag',
    endLeaf(_cx, line, _leaf) {
      const ret = line.next == 123 && line.text.slice(line.pos).trim().startsWith('{%');
      if(ret){
      }
      return ret;
    },

    parse(cx, line) {
      if (line.next != 123) return false;
      const content = line.text.slice(line.pos).trim();
      if (!content.startsWith('{%') || !content.endsWith('%}')) return false;
      cx.addElement(cx.elt('MarkdocTag', cx.lineStart, cx.lineStart + line.text.length));
      cx.nextLine();
      return true;
    },
  }]
} as MarkdownConfig;
