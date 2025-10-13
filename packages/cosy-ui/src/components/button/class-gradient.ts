/**
 * 获取 Button 组件的渐变变体类名
 * @param variant Button 渐变变体
 * @returns 渐变变体类名
 */
export function getButtonGradientClass(
	variant?:
		| "gradient-sky"
		| "gradient-watermelon"
		| "gradient-lemon"
		| "gradient-grape"
		| "gradient-mango"
		| "gradient-forest"
		| "gradient-ocean"
		| "gradient-sunset"
		| "gradient-flower"
		| "gradient-pitaya"
		| "gradient-banana"
		| "gradient-blueberry"
		| "gradient-kiwi",
): string {
	// 渐变变体类名
	const gradientClasses = {
		"gradient-sky":
			"cosy:bg-gradient-to-r cosy:from-sky-400 cosy:to-indigo-500 cosy:text-white hover:cosy:from-sky-500 hover:cosy:to-indigo-600",
		"gradient-watermelon":
			"cosy:bg-gradient-to-r cosy:from-green-300 cosy:via-pink-400 cosy:to-red-500 cosy:text-white hover:cosy:from-green-400 hover:cosy:to-red-600",
		"gradient-lemon":
			"cosy:bg-gradient-to-r cosy:from-yellow-200 cosy:via-yellow-400 cosy:to-yellow-600 cosy:text-gray-900 hover:cosy:from-yellow-300 hover:cosy:to-yellow-700",
		"gradient-grape":
			"cosy:bg-gradient-to-r cosy:from-purple-400 cosy:via-indigo-500 cosy:to-purple-700 cosy:text-white hover:cosy:from-purple-500 hover:cosy:to-purple-800",
		"gradient-mango":
			"cosy:bg-gradient-to-r cosy:from-yellow-300 cosy:via-orange-400 cosy:to-orange-600 cosy:text-white hover:cosy:from-yellow-400 hover:cosy:to-orange-700",
		"gradient-forest":
			"cosy:bg-gradient-to-r cosy:from-green-700 cosy:to-lime-300 cosy:text-white hover:cosy:from-green-800 hover:cosy:to-lime-400",
		"gradient-ocean":
			"cosy:bg-gradient-to-r cosy:from-cyan-400 cosy:to-blue-700 cosy:text-white hover:cosy:from-cyan-500 hover:cosy:to-blue-800",
		"gradient-sunset":
			"cosy:bg-gradient-to-r cosy:from-orange-400 cosy:via-pink-500 cosy:to-red-500 cosy:text-white hover:cosy:from-orange-500 hover:cosy:to-red-600",
		"gradient-flower":
			"cosy:bg-gradient-to-r cosy:from-pink-300 cosy:via-purple-400 cosy:to-fuchsia-500 cosy:text-white hover:cosy:from-pink-400 hover:cosy:to-fuchsia-600",
		"gradient-pitaya":
			"cosy:bg-gradient-to-r cosy:from-pink-200 cosy:via-fuchsia-400 cosy:to-lime-300 cosy:text-white hover:cosy:from-pink-300 hover:cosy:to-lime-400",
		"gradient-banana":
			"cosy:bg-gradient-to-r cosy:from-yellow-100 cosy:via-yellow-300 cosy:to-yellow-500 cosy:text-gray-900 hover:cosy:from-yellow-200 hover:cosy:to-yellow-600",
		"gradient-blueberry":
			"cosy:bg-gradient-to-r cosy:from-blue-400 cosy:via-blue-600 cosy:to-indigo-700 cosy:text-white hover:cosy:from-blue-500 hover:cosy:to-indigo-800",
		"gradient-kiwi":
			"cosy:bg-gradient-to-r cosy:from-lime-200 cosy:via-green-400 cosy:to-green-700 cosy:text-white hover:cosy:from-lime-300 hover:cosy:to-green-800",
	};

	return variant ? gradientClasses[variant] || "" : "";
}
