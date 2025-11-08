/**
 * 控制台表格数据生成工具
 */

export interface ConsoleDataRow {
	id: string;
	timestamp: string;
	operation: string;
	user: string;
	resource: string;
	status: string;
	ip: string;
	duration: string;
	size: string;
}

/**
 * 生成模拟控制台数据
 */
export const generateConsoleData = (
	count: number,
	locale: string,
): ConsoleDataRow[] => {
	const statuses = ["success", "warning", "error", "info"];
	const operations = ["CREATE", "UPDATE", "DELETE", "READ", "EXPORT"];
	const users = ["admin", "user001", "user002", "operator", "manager"];
	const isZhCn = locale === "zh-cn";
	const resources = isZhCn
		? [
				"订单数据",
				"用户信息",
				"商品库存",
				"支付记录",
				"系统日志",
				"配置信息",
				"统计数据",
				"报告文件",
			]
		: [
				"Order Data",
				"User Info",
				"Product Inventory",
				"Payment Records",
				"System Logs",
				"Configuration",
				"Statistics",
				"Report Files",
			];

	return Array.from({ length: count }, (_, i) => {
		const id = String(i + 1).padStart(6, "0");
		const timestamp = new Date(
			Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
		).toISOString();
		return {
			id,
			timestamp,
			operation: operations[Math.floor(Math.random() * operations.length)],
			user: users[Math.floor(Math.random() * users.length)],
			resource: resources[Math.floor(Math.random() * resources.length)],
			status: statuses[Math.floor(Math.random() * statuses.length)],
			ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
			duration: `${Math.floor(Math.random() * 1000)}ms`,
			size: `${Math.floor(Math.random() * 10000)} KB`,
		};
	});
};
