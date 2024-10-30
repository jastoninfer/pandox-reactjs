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
        
        // 检查当前位置是否是图片的开始'!'
        // console.log('hrere, ', cx.char(pos));
        if (cx.char(pos) === 33 && cx.char(pos + 1) === 91) {
        //   console.log('go....');
          let altEnd = pos + 2; // 跳过![, 查找]
          while(altEnd < cx.end && cx.char(altEnd) !== 93) {
            altEnd++;
          }
          // 如果找到], 并且接下来有(, 表示图片的链接部分
          if(altEnd < cx.end && cx.char(altEnd + 1) === 40) {
            let linkStart = altEnd + 2; // 跳过](
            let linkEnd = linkStart;
            while(linkEnd < cx.end && cx.char(linkEnd) !== 41){
              linkEnd++;
            }
            // 确保链接不为空
            if(linkEnd > linkStart){
              const altText = cx.slice(pos + 2, altEnd);
              const link = cx.slice(linkStart, linkEnd);
            //   console.log('alt', altText);
            //   console.log('link', link);
              // 添加inlineIMAGE节点
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
        // 检查当前位置是否是$符号, 不是两个连续的 $$
        if(cx.char(pos) === 36 && (pos + 1) < cx.end && cx.char(pos + 1) !== 36) {
          // console.log('enter...');
          // console.log(cx.char(pos+1));
          // '$'
          let endPos = pos + 1; // 跳过第一个 $

          // 查找下一个 $
          while(endPos < cx.end && cx.char(endPos) !== 36) {
            endPos++;
          }

          // 确保找到闭合的$且中间内容不为空
          if(endPos > pos + 1 && endPos < cx.end) {
            // console.log('OK....');
            const content = cx.slice(pos + 1, endPos);// 获取$...$中的内容
            // 添加latex节点到解析结果
            const element = cx.elt('InlineLaTeX', pos, endPos+1);
            cx.addElement(element);
            return endPos + 1; // 返回解析结束后的下一个字符的位置 
          }
        }
        // 如果当前字符不是$或者没有匹配的结束$, 返回-1, 表示不解析
        return -1;
      }
    }
  ],
  parseBlock: [
    {
      name: 'BlockImage',
      parse(cx, line) {
        // console.log('cur line is...', line.text);
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
        // console.log('cur line is...', line.text);
        // return false;
        // console.log('go...', cx.line);
        if(line.text.startsWith('$$') && line.text.trim() === '$$'){
          // console.log(cx);
          // console.log(line);
          // console.log('prev', cx.line);
          // cx.nextLine(); // 读取下一行, 跳过$$行
          // console.log(line);
          // console.log('afer', cx.line);
          let start = cx.lineStart; // 记录latex块的开始位置
          let _end = start + 1;
          let content = ''; // 用于存储公式内容
          let sz = line.text.length;

          // 遍历后续行，直到遇到结束符号$$或文档结束
          // console.log('CX', cx);
          // return false;
          while(cx.nextLine()){
            let currentLine = line.text;
            // console.log(' ==> line index', cx.lineStart);
            if(currentLine.startsWith('$$') && currentLine.trim() === '$$'){
              
              const end = cx.lineStart + currentLine.length;
              // console.log('inside');
            //   console.log('push', start, end);
              cx.addElement(cx.elt('LaTeXBlock', start, end));
              // cx.nextLine = end + 1;
              cx.nextLine();
              return true;
            }else{
              // 不是$$行, 累积latex内容
              if(currentLine.trim() === ''){
                return false;
              }
              content += currentLine + '\n'; // 累积内容
              sz += currentLine.length;
            }
          }
          // 如果到达文档末尾仍未找到结束符, 抛弃块
          return false;
        }
        return false; // 如果不是Latex块, 则返回null
      }
    },
  //   {
  //   name: 'BlockLatexTag',
  //   endLeaf(_cx, line, _leaf) {
  //     if(line.next !== '$'.charCodeAt(0)) return false;
  //     const text = line.text.slice(line.pos).trim();
  //     // console.log(_leaf);
  //     return text.startsWith('$$');
  //     // const ret = line.next == '$'.charCodeAt(0) && line.text.slice(line.pos).trim().startsWith('$$');
  //     // return ret;
  //   },
  //   parse(cx, line) {
  //     if (line.next != '$'.charCodeAt(0)) return false;
  //     // $$开头
  //     const content = line.text.slice(line.pos).trim();
  //     if (!content.startsWith('$$')) return false;
  //     // console.log(line);
  //     if(content === '$$$$') return false;
  //     cx.addElement(cx.elt('BlockLatexTag', cx.lineStart, cx.lineStart + line.text.length));
  //     cx.nextLine();
  //     return true;
  //   }
  // },
    {
    name: 'MarkdocTag',
    endLeaf(_cx, line, _leaf) {
    //   console.log('==>', _leaf.content);
      // console.log(_cx, _leaf);
      // console.log('#', line.next, line.text);
      // console.log(line.next == -1);
      // console.log(line.next);
      // console.log(Object.entries(line));
      // if(line.next == 123 && line.text.slice(line.pos).trim().startsWith('{%')){
      //   console.log('true');
      // }else{
      //   console.log('false');
      // }
      // return true;
      // return true;
      // return false;
      // console.log(line);
      const ret = line.next == 123 && line.text.slice(line.pos).trim().startsWith('{%');
      if(ret){
        // console.log('#E', line.next, line.text);
      }
      return ret;
    },

    parse(cx, line) {
      // console.log(line.next, line.text, line.pos, line.text.slice(line.pos).trim());
    //   console.log('next line is', line.text);
      if (line.next != 123) return false;
      // 如果不是{符号打头, 直接拒绝处理, 这不是我们要解析的目标块
      const content = line.text.slice(line.pos).trim();
      // 滤掉起始符号, 得到文本
      if (!content.startsWith('{%') || !content.endsWith('%}')) return false;
      // 如果不满足格式{%.....%}形式, 直接拒绝处理
      // console.log(line.text);
      // 否则这里是我们期望的起始块, 我们希望emit一个MarkdocTag类型的Node
      // console.log('good, len is ', line.text.length);
      cx.addElement(cx.elt('MarkdocTag', cx.lineStart, cx.lineStart + line.text.length));
      // 直接移动到下一行, 代表这一行被我们consume掉了
      // console.log('next line is', line.next);
      cx.nextLine();
      // console.log(cx);
      // console.log('!P', line.next, line.text);
      return true;
    },
  }]
} as MarkdownConfig;
