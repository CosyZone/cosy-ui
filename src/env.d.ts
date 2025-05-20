/// <reference types="vite/client" />

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

declare module '*.gif' {
	const value: string;
	export default value;
}
