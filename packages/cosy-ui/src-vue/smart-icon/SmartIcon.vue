<script setup lang="ts">
import { computed } from "vue";
import VueIcon from "../icons/VueIcon.vue";

interface Props {
	/**
	 * 关键词，支持多个关键词用空格或逗号分隔
	 * @default ""
	 */
	keyword?: string;
	/**
	 * 图标的大小
	 * @default "24px"
	 */
	size?: string;
	/**
	 * 图标的颜色
	 * @default "currentColor"
	 */
	color?: string;
	/**
	 * 自定义类名
	 */
	class?: string;
}

const props = withDefaults(defineProps<Props>(), {
	keyword: "",
	size: "24px",
	color: "currentColor",
	class: "",
});

// 智能图标映射
const iconMap: Record<string, string> = {
	// 用户相关
	user: "user",
	person: "user",
	account: "user",
	profile: "user",

	// 警告相关
	warning: "warning",
	danger: "alertTriangle",

	// 信息相关
	info: "info",
	information: "info",
	help: "info",

	// 链接相关
	link: "link",
	url: "link",
	external: "link",

	// 菜单相关
	menu: "menu",
	hamburger: "menu",
	navigation: "menu",

	// 刷新相关
	refresh: "refresh",
	reload: "refresh",
	update: "refresh",

	// 搜索相关
	search: "search",
	find: "search",
	lookup: "search",

	// 成功相关
	success: "success",
	check: "check",
	done: "check",
	complete: "check",

	// 天气相关
	sun: "sunCloudy",
	weather: "sunCloudy",
	cloud: "sunCloudy",

	// 日历相关
	calendar: "calendar",
	date: "calendar",
	schedule: "calendar",

	// 检查相关
	checkCircle: "checkCircle",
	verify: "checkCircle",
	confirm: "checkCircle",

	// 剪贴板相关
	clipboard: "clipboard",
	copy: "clipboard",
	paste: "clipboard",

	// 关闭相关
	close: "close",
	x: "close",
	cancel: "close",

	// 代码相关
	code: "code",
	programming: "code",
	development: "code",
	software: "code",

	// 删除相关
	delete: "delete",
	remove: "delete",
	trash: "delete",

	// 错误相关
	error: "error",
	fail: "error",
	bug: "error",

	// GitHub相关
	github: "github",
	git: "github",
	repository: "github",

	// 设置相关
	settings: "settings",
	config: "settings",
	configuration: "settings",
	gear: "settings",

	// 主页相关
	home: "home",
	main: "home",
	index: "home",

	// 仪表盘相关
	dashboard: "dashboard",
	overview: "dashboard",
	stats: "dashboard",

	// 图表相关
	chart: "chart",
	graph: "chart",
	data: "chart",
	analytics: "chart",

	// 文档相关
	document: "document",
	file: "document",
	page: "document",

	// 通知相关
	notification: "notification",
	bell: "notification",

	// 用户组相关
	users: "users",
	team: "users",
	group: "users",

	// 消息相关
	message: "message",
	chat: "message",
	conversation: "message",

	// 邮件相关
	mail: "mail",
	email: "mail",
	inbox: "mail",

	// 文件夹相关
	folder: "folder",
	directory: "folder",
	storage: "folder",

	// 收藏相关
	star: "star",
	favorite: "star",
	bookmark: "star",

	// 喜欢相关
	heart: "heart",
	like: "heart",
	love: "heart",

	// 保存相关
	save: "save",
	backup: "save",

	// 编辑相关
	edit: "edit",
	modify: "edit",
	change: "edit",

	// 工具相关
	tools: "tools",
	utility: "tools",
	equipment: "tools",

	// 钱包相关
	wallet: "wallet",
	money: "wallet",
	payment: "wallet",

	// 报告相关
	report: "report",
	statistics: "report",

	// 安全相关
	security: "security",
	shield: "security",
	protect: "security",

	// 上传相关
	upload: "upload",
	send: "upload",
	share: "upload",

	// 下载相关
	download: "download",
	get: "download",
	receive: "download",

	// 退出相关
	logout: "logOut",
	signout: "logOut",
	exit: "logOut",

	// 应用商店相关
	appstore: "appStore",
	marketplace: "appStore",

	// 网站相关
	website: "website",
	web: "website",
	site: "website",

	// 默认图标
	default: "document",
};

// 计算要显示的图标名称
const iconName = computed(() => {
	if (!props.keyword) {
		return "document"; // 默认图标
	}

	// 支持多个关键词，用空格或逗号分隔
	const keywords = props.keyword.split(/[\s,]+/).filter((k) => k.trim());

	// 遍历每个关键词，找到第一个匹配的图标
	for (const keyword of keywords) {
		const trimmedKeyword = keyword.trim().toLowerCase();
		if (!trimmedKeyword) continue;

		// 直接匹配
		if (iconMap[trimmedKeyword]) {
			return iconMap[trimmedKeyword];
		}

		// 包含匹配
		for (const key in iconMap) {
			if (trimmedKeyword.includes(key) || key.includes(trimmedKeyword)) {
				return iconMap[key];
			}
		}
	}

	return "document"; // 默认图标
});
</script>

<template>
    <VueIcon :name="iconName" :size="size" :color="color" :class="props.class" />
</template>
