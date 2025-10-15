// 背景色 key 到类名的映射
export const bgColorMap: { [key: string]: string } = {
	primary: "cosy:bg-blue-500 cosy:dark:bg-blue-800",
	success: "cosy:bg-green-500 cosy:dark:bg-green-800",
	danger: "cosy:bg-red-500 cosy:dark:bg-red-800",
	warning: "cosy:bg-yellow-400 cosy:dark:bg-yellow-600",
	info: "cosy:bg-cyan-400 cosy:dark:bg-cyan-700",
	neutral: "cosy:bg-gray-200 cosy:dark:bg-gray-700",
	forest: "cosy:bg-green-700 cosy:dark:bg-green-900",
	ocean: "cosy:bg-blue-700 cosy:dark:bg-blue-900",
	sky: "cosy:bg-sky-400 cosy:dark:bg-sky-700",
	lemon: "cosy:bg-lime-300 cosy:dark:bg-lime-700",
	orange: "cosy:bg-orange-400 cosy:dark:bg-orange-700",
	cherry: "cosy:bg-rose-500 cosy:dark:bg-rose-800",
	grape: "cosy:bg-purple-500 cosy:dark:bg-purple-800",
	banana: "cosy:bg-yellow-300 cosy:dark:bg-yellow-600",
	watermelon: "cosy:bg-pink-400 cosy:dark:bg-pink-700",
	peach: "cosy:bg-orange-200 cosy:dark:bg-orange-500",
	avocado: "cosy:bg-lime-600 cosy:dark:bg-lime-900",
	coconut: "cosy:bg-stone-200 cosy:dark:bg-stone-600",
	blueberry: "cosy:bg-indigo-500 cosy:dark:bg-indigo-900",
	kiwi: "cosy:bg-green-400 cosy:dark:bg-green-700",
	mint: "cosy:bg-teal-300 cosy:dark:bg-teal-700",
	sand: "cosy:bg-yellow-200 cosy:dark:bg-yellow-700",
	sunset: "cosy:bg-pink-300 cosy:dark:bg-pink-700",
	lavender: "cosy:bg-purple-300 cosy:dark:bg-purple-700",
	snow: "cosy:bg-white cosy:dark:bg-gray-800",
};

// 渐变色 key 到类名的映射
export const bgGradientMap: { [key: string]: string } = {
	primary:
		"cosy:bg-gradient-to-r cosy:from-blue-300/50 cosy:via-blue-400/50 cosy:to-blue-500/50 cosy:dark:from-blue-700/50 cosy:dark:via-blue-800/50 cosy:dark:to-blue-900/50",
	success:
		"cosy:bg-gradient-to-r cosy:from-green-300/50 cosy:via-green-400/50 cosy:to-green-500/50 cosy:dark:from-green-700/50 cosy:dark:via-green-800/50 cosy:dark:to-green-900/50",
	danger:
		"cosy:bg-gradient-to-r cosy:from-red-300/50 cosy:via-red-400/50 cosy:to-red-500/50 cosy:dark:from-red-700/50 cosy:dark:via-red-800/50 cosy:dark:to-red-900/50",
	warning:
		"cosy:bg-gradient-to-r cosy:from-yellow-200/50 cosy:via-yellow-300/50 cosy:to-yellow-400/50 cosy:dark:from-yellow-600/50 cosy:dark:via-yellow-700/50 cosy:dark:to-yellow-800/50",
	info: "cosy:bg-gradient-to-r cosy:from-cyan-200/50 cosy:via-cyan-300/50 cosy:to-cyan-400/50 cosy:dark:from-cyan-600/50 cosy:dark:via-cyan-700/50 cosy:dark:to-cyan-800/50",
	neutral:
		"cosy:bg-gradient-to-r cosy:from-gray-100/50 cosy:via-gray-200/50 cosy:to-gray-300/50 cosy:dark:from-gray-700/50 cosy:dark:via-gray-800/50 cosy:dark:to-gray-900/50",
	forest:
		"cosy:bg-gradient-to-r cosy:from-green-600/50 cosy:via-green-700/50 cosy:to-green-800/50 cosy:dark:from-green-800/50 cosy:dark:via-green-900/50 cosy:dark:to-green-950/50",
	ocean:
		"cosy:bg-gradient-to-r cosy:from-blue-400/50 cosy:via-blue-600/50 cosy:to-blue-800/50 cosy:dark:from-blue-800/50 cosy:dark:via-blue-900/50 cosy:dark:to-blue-950/50",
	sky: "cosy:bg-gradient-to-r cosy:from-sky-200/50 cosy:via-sky-300/50 cosy:to-sky-400/50 cosy:dark:from-sky-700/50 cosy:dark:via-sky-800/50 cosy:dark:to-sky-900/50",
	lemon:
		"cosy:bg-gradient-to-r cosy:from-lime-200/50 cosy:via-lime-300/50 cosy:to-lime-400/50 cosy:dark:from-lime-700/50 cosy:dark:via-lime-800/50 cosy:dark:to-lime-900/50",
	orange:
		"cosy:bg-gradient-to-r cosy:from-orange-200/50 cosy:via-orange-300/50 cosy:to-orange-400/50 cosy:dark:from-orange-700/50 cosy:dark:via-orange-800/50 cosy:dark:to-orange-900/50",
	cherry:
		"cosy:bg-gradient-to-r cosy:from-rose-300/50 cosy:via-rose-400/50 cosy:to-rose-500/50 cosy:dark:from-rose-700/50 cosy:dark:via-rose-800/50 cosy:dark:to-rose-900/50",
	grape:
		"cosy:bg-gradient-to-r cosy:from-purple-300/50 cosy:via-purple-400/50 cosy:to-purple-500/50 cosy:dark:from-purple-700/50 cosy:dark:via-purple-800/50 cosy:dark:to-purple-900/50",
	banana:
		"cosy:bg-gradient-to-r cosy:from-yellow-100/50 cosy:via-yellow-200/50 cosy:to-yellow-300/50 cosy:dark:from-yellow-600/50 cosy:dark:via-yellow-700/50 cosy:dark:to-yellow-800/50",
	watermelon:
		"cosy:bg-gradient-to-r cosy:from-pink-200/50 cosy:via-pink-300/50 cosy:to-pink-400/50 cosy:dark:from-pink-700/50 cosy:dark:via-pink-800/50 cosy:dark:to-pink-900/50",
	peach:
		"cosy:bg-gradient-to-r cosy:from-orange-100/50 cosy:via-orange-200/50 cosy:to-orange-300/50 cosy:dark:from-orange-500/50 cosy:dark:via-orange-600/50 cosy:dark:to-orange-700/50",
	avocado:
		"cosy:bg-gradient-to-r cosy:from-lime-400/50 cosy:via-lime-500/50 cosy:to-lime-600/50 cosy:dark:from-lime-800/50 cosy:dark:via-lime-900/50 cosy:dark:to-lime-950/50",
	coconut:
		"cosy:bg-gradient-to-r cosy:from-stone-100/50 cosy:via-stone-200/50 cosy:to-stone-300/50 cosy:dark:from-stone-600/50 cosy:dark:via-stone-700/50 cosy:dark:to-stone-800/50",
	blueberry:
		"cosy:bg-gradient-to-r cosy:from-indigo-300/50 cosy:via-indigo-400/50 cosy:to-indigo-500/50 cosy:dark:from-indigo-800/50 cosy:dark:via-indigo-900/50 cosy:dark:to-indigo-950/50",
	kiwi: "cosy:bg-gradient-to-r cosy:from-green-200/50 cosy:via-green-300/50 cosy:to-green-400/50 cosy:dark:from-green-700/50 cosy:dark:via-green-800/50 cosy:dark:to-green-900/50",
	mint: "cosy:bg-gradient-to-r cosy:from-teal-200/50 cosy:via-teal-300/50 cosy:to-teal-400/50 cosy:dark:from-teal-700/50 cosy:dark:via-teal-800/50 cosy:dark:to-teal-900/50",
	sand: "cosy:bg-gradient-to-r cosy:from-yellow-100/50 cosy:via-yellow-200/50 cosy:to-yellow-300/50 cosy:dark:from-yellow-700/50 cosy:dark:via-yellow-800/50 cosy:dark:to-yellow-900/50",
	sunset:
		"cosy:bg-gradient-to-r cosy:from-pink-200/50 cosy:via-pink-300/50 cosy:to-pink-400/50 cosy:dark:from-pink-700/50 cosy:dark:via-pink-800/50 cosy:dark:to-pink-900/50",
	lavender:
		"cosy:bg-gradient-to-r cosy:from-purple-100/50 cosy:via-purple-200/50 cosy:to-purple-300/50 cosy:dark:from-purple-700/50 cosy:dark:via-purple-800/50 cosy:dark:to-purple-900/50",
	snow: "cosy:bg-gradient-to-r cosy:from-white/50 cosy:via-gray-100/50 cosy:to-gray-200/50 cosy:dark:from-gray-800/50 cosy:dark:via-gray-900/50 cosy:dark:to-black/50",
};

// 哈希函数，将字符串映射为数字
function hashString(str: string): number {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = (hash << 5) - hash + str.charCodeAt(i);
		hash |= 0; // 转为32位整数
	}
	return Math.abs(hash);
}

// 关键词到 key 的哈希映射
export function mapKeywordToBgKey(keyword: string): string {
	const keys = Object.keys(bgColorMap);
	if (!keyword) return "neutral";
	const hash = hashString(keyword.toLowerCase());
	const idx = hash % keys.length;
	return keys[idx];
}
