/// <reference types="astro/client" />
declare module '*.astro' {
    const component: (props: any) => any;
    export default component;
} 