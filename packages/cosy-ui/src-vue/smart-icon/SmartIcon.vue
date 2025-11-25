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
	success: "check",
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
	error: "alertTriangle",
	fail: "alertTriangle",
	bug: "alertTriangle",

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

// 中文关键词映射
const zhMap: Record<string, string> = {
	// 用户相关
	用户: "user",
	人: "user",
	账号: "user",
	个人: "user",
	// 警告相关
	警告: "alertTriangle",
	注意: "alertTriangle",
	// 信息相关
	信息: "info",
	提示: "info",
	// 链接相关
	链接: "link",
	// 菜单相关
	菜单: "menu",
	// 刷新相关
	刷新: "refresh",
	// 搜索相关
	搜索: "search",
	// 成功相关
	成功: "checkCircle",
	// 天气相关
	太阳: "sunCloudy",
	天气: "sunCloudy",
	// 日历相关
	日历: "calendar",
	// 检查相关
	勾: "check",
	对: "check",
	完成: "check",
	// 剪贴板相关
	剪贴板: "clipboard",
	// 关闭相关
	关闭: "close",
	叉: "close",
	// 代码相关
	代码: "code",
	编程: "code",
	开发: "code",
	软件: "code",
	算法: "code",
	数据结构: "code",
	前端: "code",
	后端: "code",
	全栈: "code",
	// 删除相关
	删除: "delete",
	// 错误相关
	错误: "alertTriangle",
	// GitHub相关
	github: "github",
	// 设置相关
	设置: "settings",
	配置: "settings",
	// 主页相关
	主页: "home",
	首页: "home",
	// 仪表盘相关
	仪表盘: "dashboard",
	// 图表相关
	图表: "chart",
	数据: "chart",
	分析: "chart",
	数学: "chart",
	计算: "chart",
	函数: "chart",
	公式: "chart",
	几何: "chart",
	代数: "chart",
	微积分: "chart",
	概率: "chart",
	统计: "chart",
	机器学习: "chart",
	人工智能: "chart",
	深度学习: "chart",
	神经网络: "chart",
	大数据: "chart",
	数据挖掘: "chart",
	数据可视化: "chart",
	性能: "chart",
	监控: "chart",
	// 文档相关
	文档: "document",
	文件: "document",
	协议: "document",
	设计模式: "document",
	日志: "document",
	版本控制: "document",
	API: "document",
	接口: "document",
	框架: "document",
	库: "document",
	依赖: "document",
	// 通知相关
	通知: "notification",
	// 用户组相关
	群: "users",
	成员: "users",
	团队: "users",
	// 消息相关
	消息: "message",
	// 邮件相关
	邮件: "mail",
	// 文件夹相关
	文件夹: "folder",
	数据库: "folder",
	// 收藏相关
	收藏: "star",
	星: "star",
	// 喜欢相关
	喜欢: "heart",
	心: "heart",
	// 保存相关
	保存: "save",
	备份: "save",
	// 编辑相关
	编辑: "edit",
	修改: "edit",
	// 工具相关
	工具: "tools",
	调试: "tools",
	持续集成: "tools",
	包管理: "tools",
	构建: "tools",
	编译: "tools",
	打包: "tools",
	// 钱包相关
	钱包: "wallet",
	// 报告相关
	报告: "report",
	// 安全相关
	安全: "security",
	// 上传相关
	上传: "upload",
	部署: "upload",
	持续部署: "upload",
	迁移: "upload",
	升级: "upload",
	// 下载相关
	下载: "download",
	回滚: "download",
	回退: "download",
	// 退出相关
	退出: "logOut",
	// 应用商店相关
	应用: "appstore",
	// 网站相关
	网站: "website",
	// 网络相关
	网络: "link",
	服务器: "settings",
	架构: "settings",
	运维: "settings",
	容器化: "settings",
	虚拟化: "settings",
	云计算: "settings",
	优化: "settings",
	缓存: "settings",
	负载均衡: "settings",
	高可用: "settings",
	容错: "settings",
	// 测试相关
	测试: "check",
	代码审查: "check",
};

// 计算要显示的图标名称
const iconName = computed(() => {
	if (!props.keyword) {
		return "document"; // 默认图标
	}

	// 支持多个关键词，用空格或逗号分隔
	const keywords = props.keyword.split(/[\s,]+/).filter((k) => k.trim());

	let matchedIcon = "document"; // 默认图标

	// 遍历每个关键词，找到第一个匹配的图标
	for (const keyword of keywords) {
		const trimmedKeyword = keyword.trim();
		if (!trimmedKeyword) continue;

		// 先检查中文映射（与 Astro 版本逻辑一致：只检查 trimmedKeyword.includes(zh)）
		for (const zh in zhMap) {
			if (trimmedKeyword.includes(zh)) {
				matchedIcon = zhMap[zh];
				break;
			}
		}

		// 如果中文映射没找到，检查英文映射
		if (matchedIcon === "document") {
			const lowerKeyword = trimmedKeyword.toLowerCase();
			if (iconMap[lowerKeyword]) {
				matchedIcon = iconMap[lowerKeyword];
			} else {
				// 检查英文包含匹配（只检查 lowerKeyword.includes(key)）
				for (const key in iconMap) {
					if (lowerKeyword.includes(key)) {
						matchedIcon = iconMap[key];
						break;
					}
				}
			}
		}

		// 如果找到了匹配的图标，就停止搜索
		if (matchedIcon !== "document") {
			break;
		}
	}

	return matchedIcon;
});
</script>

<template>
    <VueIcon :name="iconName" :size="size" :color="color" :class="props.class" />
</template>
