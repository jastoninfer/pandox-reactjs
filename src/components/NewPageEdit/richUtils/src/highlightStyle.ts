import { HighlightStyle } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

export default HighlightStyle.define([
  { tag: t.heading1, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '1.8rem', textDecoration: 'none' },
  { tag: t.heading2, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '1.6rem', textDecoration: 'none' },
  { tag: t.heading3, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '1.4rem', textDecoration: 'none' },
  { tag: t.heading4, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: '1.2rem', textDecoration: 'none' },
  { tag: t.link, fontFamily: 'sans-serif', textDecoration: 'underline', color: 'blue' },
  { tag: t.emphasis, fontFamily: 'sans-serif', fontStyle: 'italic' },
  { tag: t.strong, fontFamily: 'sans-serif', fontWeight: 'bold' },
  { tag: t.monospace, fontFamily: 'monospace' },
  { tag: t.content, fontFamily: 'sans-serif' },
  { tag: t.meta, color: 'darkgrey' },
]);