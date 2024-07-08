declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.ico' {
    const value: string;
    export default value;
}

declare module 'marked-katex-extension' {
    interface MarkedKatexOptions {
        throwOnError?: boolean;
    }
    function markedKatex(options?:MarkedKatexOptions): any;
    export default markedKatex;
}

declare module 'marked-plaintify' {
    function markedPlaintify(): any;
    export default markedPlaintify;
}
