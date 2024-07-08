import type { _TimeStampResData } from './services';
export type _Image = {
    name: string;
    author: string;
    type: string;
};

export interface ImageResData extends _Image, _TimeStampResData {}
