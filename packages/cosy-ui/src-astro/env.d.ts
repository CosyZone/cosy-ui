/// <reference types="astro/client" />
/// <reference types="vite/client" />

// 确保 Astro 全局类型正确加载
declare global {
    namespace astroHTML.JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

declare module '*.vue?raw' {
    const content: string;
    export default content;
}

// 添加图片模块声明
declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

// 允许在 TS 中直接导入 .astro 组件
declare module '*.astro' {
    const Component: any;
    export default Component;
}

declare module '*.gif' {
    const value: string;
    export default value;
}
