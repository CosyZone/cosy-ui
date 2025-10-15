#!/usr/bin/env node

import { spawn, exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execAsync = promisify(exec);

/**
 * 开发环境启动脚本
 * 用于启动 cosy-framework-example 项目
 */
class DevExampleScript {
	constructor() {
		this.projectRoot = process.cwd();
		this.exampleDir = path.join(
			this.projectRoot,
			"packages/cosy-framework-example",
		);
		this.frameworkDir = path.join(this.projectRoot, "packages/cosy-framework");

		// 解析命令行参数
		this.forceRebuild =
			process.argv.includes("--force") || process.argv.includes("-f");
		this.showHelp =
			process.argv.includes("--help") || process.argv.includes("-h");
	}

	/**
	 * 打印带颜色的日志
	 */
	log(message, type = "info") {
		const colors = {
			info: "\x1b[34m", // 蓝色
			success: "\x1b[32m", // 绿色
			warning: "\x1b[33m", // 黄色
			error: "\x1b[31m", // 红色
			reset: "\x1b[0m", // 重置
		};

		const timestamp = new Date().toLocaleTimeString();
		console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
	}

	/**
	 * 检查目录是否存在
	 */
	checkDirectory(dir, name) {
		if (!fs.existsSync(dir)) {
			this.log(`❌ ${name} 目录不存在: ${dir}`, "error");
			return false;
		}
		this.log(`✅ ${name} 目录存在`, "success");
		return true;
	}

	/**
	 * 检查包是否已构建
	 */
	async checkPackageBuilt(packageDir, packageName) {
		const distDir = path.join(packageDir, "dist");
		if (!fs.existsSync(distDir)) {
			this.log(`⚠️  ${packageName} 未构建，需要先构建`, "warning");
			return false;
		}

		// 检查 dist 目录是否有内容
		const files = fs.readdirSync(distDir);
		if (files.length === 0) {
			this.log(`⚠️  ${packageName} dist 目录为空，需要重新构建`, "warning");
			return false;
		}

		this.log(`✅ ${packageName} 已构建`, "success");
		return true;
	}

	/**
	 * 构建依赖包
	 */
	async buildDependencies() {
		this.log("🔨 开始构建依赖包...", "info");

		const buildCommands = [
			{ name: "interfaces", command: "pnpm build:interfaces" },
			{ name: "config", command: "pnpm build:config" },
			{ name: "container", command: "pnpm build:container" },
			{ name: "logger", command: "pnpm build:logger" },
			{ name: "http", command: "pnpm build:http" },
			{ name: "router", command: "pnpm build:router" },
			{ name: "middleware", command: "pnpm build:middleware" },
		];

		try {
			for (const { name, command } of buildCommands) {
				this.log(`📦 构建 ${name}...`, "info");

				const { _stdout, stderr } = await execAsync(command, {
					cwd: this.projectRoot,
				});

				if (stderr && !stderr.includes("deprecated")) {
					this.log(`构建 ${name} 警告: ${stderr}`, "warning");
				}

				this.log(`✅ ${name} 构建完成`, "success");
			}

			return true;
		} catch (error) {
			this.log(`❌ 依赖包构建失败: ${error.message}`, "error");
			return false;
		}
	}

	/**
	 * 构建框架包
	 */
	async buildFramework() {
		this.log("🔨 开始构建 cosy-framework...", "info");

		try {
			const { _stdout, stderr } = await execAsync("pnpm build:framework", {
				cwd: this.projectRoot,
			});

			if (stderr && !stderr.includes("deprecated")) {
				this.log(`构建警告: ${stderr}`, "warning");
			}

			this.log("✅ cosy-framework 构建完成", "success");
			return true;
		} catch (error) {
			this.log(`❌ cosy-framework 构建失败: ${error.message}`, "error");
			return false;
		}
	}

	/**
	 * 启动示例项目
	 */
	async startExample() {
		this.log("🚀 启动示例项目...", "info");

		return new Promise((resolve, reject) => {
			const child = spawn("pnpm", ["dev"], {
				cwd: this.exampleDir,
				stdio: "inherit",
				shell: true,
			});

			child.on("error", (error) => {
				this.log(`❌ 启动失败: ${error.message}`, "error");
				reject(error);
			});

			// 监听进程退出
			child.on("exit", (code) => {
				if (code === 0) {
					this.log("✅ 示例项目已停止", "info");
				} else {
					this.log(`❌ 示例项目异常退出，代码: ${code}`, "error");
				}
				resolve(code);
			});

			// 处理 Ctrl+C
			process.on("SIGINT", () => {
				this.log("🛑 正在停止示例项目...", "warning");
				child.kill("SIGINT");
			});

			process.on("SIGTERM", () => {
				this.log("🛑 正在停止示例项目...", "warning");
				child.kill("SIGTERM");
			});
		});
	}

	/**
	 * 显示帮助信息
	 */
	showHelpInfo() {
		console.log(`
🌟 Cosy Framework 示例开发脚本

用法:
  pnpm dev:example [选项]

选项:
  -f, --force    强制重新构建所有依赖包
  -h, --help     显示此帮助信息

示例:
  pnpm dev:example           # 正常启动（智能检测是否需要构建）
  pnpm dev:example --force   # 强制重新构建后启动
`);
	}

	/**
	 * 主执行流程
	 */
	async run() {
		if (this.showHelp) {
			this.showHelpInfo();
			return;
		}

		this.log("🌟 启动 Cosy Framework 示例开发环境", "info");

		if (this.forceRebuild) {
			this.log("🔄 强制重新构建模式", "warning");
		}

		try {
			// 1. 检查目录结构
			if (!this.checkDirectory(this.exampleDir, "cosy-framework-example")) {
				process.exit(1);
			}

			if (!this.checkDirectory(this.frameworkDir, "cosy-framework")) {
				process.exit(1);
			}

			// 2. 检查框架是否已构建
			const frameworkBuilt = await this.checkPackageBuilt(
				this.frameworkDir,
				"cosy-framework",
			);

			// 3. 如果未构建或强制重新构建，先构建所有依赖和框架
			if (!frameworkBuilt || this.forceRebuild) {
				if (this.forceRebuild) {
					this.log("🔄 强制重新构建所有依赖包", "info");
				}
				// 先构建依赖包
				const depsSuccess = await this.buildDependencies();
				if (!depsSuccess) {
					this.log("❌ 依赖包构建失败。这可能是由于:", "error");
					this.log("  • ES 模块导入路径问题", "error");
					this.log("  • TypeScript 配置问题", "error");
					this.log("  • 依赖关系问题", "error");
					this.log("💡 建议先手动修复构建错误，然后重试", "warning");
					process.exit(1);
				}

				// 再构建框架
				const buildSuccess = await this.buildFramework();
				if (!buildSuccess) {
					this.log("❌ 无法构建框架，退出", "error");
					process.exit(1);
				}
			}

			// 4. 启动示例项目
			await this.startExample();
		} catch (error) {
			this.log(`❌ 执行失败: ${error.message}`, "error");
			process.exit(1);
		}
	}
}

// 执行脚本
const devScript = new DevExampleScript();
devScript.run().catch((error) => {
	console.error("脚本执行失败:", error);
	process.exit(1);
});
