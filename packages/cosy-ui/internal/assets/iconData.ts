/**
 * 图标数据共享文件
 * 这个文件包含所有图标的SVG路径数据
 * 供Astro和Vue组件共同使用
 */

export interface IconData {
	/**
	 * 图标路径数据
	 */
	path: string;
	/**
	 * 额外的视图框设置，默认为"0 0 24 24"
	 */
	viewBox?: string;
	/**
	 * 图标类型：fill（实心）或stroke（线条），默认为"stroke"
	 */
	type?: "fill" | "stroke";
	/**
	 * 是否为多路径图标，默认为false
	 */
	multiPath?: boolean;
}

// 导入所有图标数据
import * as icons from "./icons-data";

// 导出图标数据对象，按字母顺序排列
export const iconData: Record<string, IconData> = {
	alertTriangle: icons.alertTriangle,
	appstore: icons.appstore,
	arrowDownS: icons.arrowDownS,
	arrowUpS: icons.arrowUpS,
	calendar: icons.calendar,
	chart: icons.chart,
	check: icons.check,
	checkCircle: icons.checkCircle,
	chevronDown: icons.chevronDown,
	chevronLeft: icons.chevronLeft,
	chevronRight: icons.chevronRight,
	close: icons.close,
	clipboard: icons.clipboard,
	code: icons.code,
	dashboard: icons.dashboard,
	delete: icons.deleteIcon,
	document: icons.document,
	download: icons.download,
	edit: icons.edit,
	facebook: icons.facebook,
	folder: icons.folder,
	function: icons.functionIcon,
	github: icons.github,
	globe: icons.globe,
	heart: icons.heart,
	home: icons.home,
	inboxArchive: icons.inboxArchive,
	info: icons.info,
	infoCircle: icons.infoCircle,
	iphoneBattery: icons.iphoneBattery,
	iphoneSignal: icons.iphoneSignal,
	iphoneWifi: icons.iphoneWifi,
	link: icons.link,
	linkedin: icons.linkedin,
	logOut: icons.logOut,
	mail: icons.mail,
	mapPin: icons.mapPin,
	menu: icons.menu,
	message: icons.message,
	notification: icons.notification,
	phone: icons.phone,
	refresh: icons.refresh,
	report: icons.report,
	save: icons.save,
	search: icons.search,
	security: icons.security,
	settings: icons.settings,
	star: icons.star,
	sunCloudy: icons.sunCloudy,
	tools: icons.tools,
	twitter: icons.twitter,
	upload: icons.upload,
	user: icons.user,
	users: icons.users,
	view: icons.view,
	wallet: icons.wallet,
	website: icons.website,
	wechat: icons.wechat,
	whatsapp: icons.whatsapp,
	xCircle: icons.xCircle,
};
