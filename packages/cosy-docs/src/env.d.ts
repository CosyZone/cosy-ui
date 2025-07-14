/// <reference types="astro/client" />

declare module '*.astro?raw' {
    const content: string;
    export default content;
} 
