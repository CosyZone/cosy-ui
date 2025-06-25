#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 修复 ES 模块导入路径的脚本
 * 为相对导入添加 .js 扩展名
 */
class ESMImportFixer {
    constructor() {
        this.projectRoot = path.resolve(__dirname, '..')
        this.packagesDir = path.join(this.projectRoot, 'packages')
        this.fixedFiles = []
        this.errors = []
    }

    /**
     * 打印带颜色的日志
     */
    log(message, type = 'info') {
        const colors = {
            info: '\x1b[34m',    // 蓝色
            success: '\x1b[32m', // 绿色
            warning: '\x1b[33m', // 黄色
            error: '\x1b[31m',   // 红色
            reset: '\x1b[0m'     // 重置
        }

        const timestamp = new Date().toLocaleTimeString()
        console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`)
    }

    /**
     * 检查是否是 TypeScript 包
     */
    async isTypeScriptPackage(packageDir) {
        try {
            const packageJsonPath = path.join(packageDir, 'package.json')
            const content = await readFile(packageJsonPath, 'utf8')
            const packageJson = JSON.parse(content)

            // 检查是否有 TypeScript 相关的内容
            return packageJson.type === 'module' &&
                (packageJson.devDependencies?.typescript ||
                    packageJson.dependencies?.typescript ||
                    content.includes('tsc'))
        } catch {
            return false
        }
    }

    /**
     * 获取所有 TypeScript 文件
     */
    async getTypeScriptFiles(dir) {
        const files = []

        try {
            const entries = await readdir(dir, { withFileTypes: true })

            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name)

                if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
                    files.push(...await this.getTypeScriptFiles(fullPath))
                } else if (entry.isFile() && entry.name.endsWith('.ts')) {
                    files.push(fullPath)
                }
            }
        } catch (error) {
            this.errors.push(`读取目录失败 ${dir}: ${error.message}`)
        }

        return files
    }

    /**
     * 修复文件中的导入路径
     */
    async fixImportsInFile(filePath) {
        try {
            const content = await readFile(filePath, 'utf8')

            // 匹配相对导入的正则表达式
            const importRegex = /(import\s+[^'"]*['"])(\.\/[^'"]+)(['"])/g
            const exportRegex = /(export\s+[^'"]*from\s+['"])(\.\/[^'"]+)(['"])/g

            let newContent = content
            let hasChanges = false

            // 修复 import 语句
            newContent = newContent.replace(importRegex, (match, before, importPath, after) => {
                if (!importPath.endsWith('.js')) {
                    hasChanges = true
                    return `${before}${importPath}.js${after}`
                }
                return match
            })

            // 修复 export from 语句
            newContent = newContent.replace(exportRegex, (match, before, exportPath, after) => {
                if (!exportPath.endsWith('.js')) {
                    hasChanges = true
                    return `${before}${exportPath}.js${after}`
                }
                return match
            })

            if (hasChanges) {
                await writeFile(filePath, newContent, 'utf8')
                this.fixedFiles.push(filePath)
                this.log(`✅ 修复: ${path.relative(this.projectRoot, filePath)}`, 'success')
            }

        } catch (error) {
            this.errors.push(`修复文件失败 ${filePath}: ${error.message}`)
        }
    }

    /**
     * 处理单个包
     */
    async processPackage(packageName) {
        const packageDir = path.join(this.packagesDir, packageName)

        if (!(await this.isTypeScriptPackage(packageDir))) {
            return
        }

        this.log(`📦 处理包: ${packageName}`, 'info')

        const srcDir = path.join(packageDir, 'src')
        const tsFiles = await this.getTypeScriptFiles(srcDir)

        for (const file of tsFiles) {
            await this.fixImportsInFile(file)
        }
    }

    /**
     * 重新构建包
     */
    async rebuildPackage(packageName) {
        const { spawn } = await import('child_process')

        return new Promise((resolve, reject) => {
            const child = spawn('pnpm', ['build'], {
                cwd: path.join(this.packagesDir, packageName),
                stdio: 'inherit'
            })

            child.on('exit', (code) => {
                if (code === 0) {
                    resolve()
                } else {
                    reject(new Error(`构建失败，退出码: ${code}`))
                }
            })

            child.on('error', reject)
        })
    }

    /**
     * 主执行流程
     */
    async run() {
        this.log('🔧 开始修复 ES 模块导入路径...', 'info')

        try {
            // 1. 获取所有包
            const packages = await readdir(this.packagesDir, { withFileTypes: true })
            const packageNames = packages
                .filter(entry => entry.isDirectory())
                .map(entry => entry.name)

            this.log(`发现 ${packageNames.length} 个包`, 'info')

            // 2. 处理每个包
            for (const packageName of packageNames) {
                await this.processPackage(packageName)
            }

            // 3. 如果有修复的文件，重新构建相关包
            if (this.fixedFiles.length > 0) {
                this.log(`\n📊 修复总结:`, 'info')
                this.log(`✅ 修复了 ${this.fixedFiles.length} 个文件`, 'success')

                // 获取需要重新构建的包
                const packagesToRebuild = new Set()
                for (const file of this.fixedFiles) {
                    const relativePath = path.relative(this.packagesDir, file)
                    const packageName = relativePath.split(path.sep)[0]
                    packagesToRebuild.add(packageName)
                }

                this.log(`\n🔨 重新构建 ${packagesToRebuild.size} 个包...`, 'info')

                for (const packageName of packagesToRebuild) {
                    try {
                        this.log(`🔨 构建: ${packageName}`, 'info')
                        await this.rebuildPackage(packageName)
                        this.log(`✅ ${packageName} 构建完成`, 'success')
                    } catch (error) {
                        this.log(`❌ ${packageName} 构建失败: ${error.message}`, 'error')
                    }
                }
            } else {
                this.log('✅ 所有导入路径都已正确', 'success')
            }

            // 4. 报告错误
            if (this.errors.length > 0) {
                this.log(`\n⚠️  遇到 ${this.errors.length} 个错误:`, 'warning')
                for (const error of this.errors) {
                    this.log(`❌ ${error}`, 'error')
                }
            }

            this.log('\n🎉 ES 模块导入路径修复完成!', 'success')

        } catch (error) {
            this.log(`❌ 执行失败: ${error.message}`, 'error')
            process.exit(1)
        }
    }
}

// 执行脚本
const fixer = new ESMImportFixer()
fixer.run().catch((error) => {
    console.error('脚本执行失败:', error)
    process.exit(1)
}) 