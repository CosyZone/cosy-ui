type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// 控制是否显示时间戳
const SHOW_TIMESTAMP = false;

// ANSI 颜色代码
const colors = {
    reset: '\x1b[0m',
    debug: '\x1b[36m', // 青色
    info: '\x1b[32m', // 绿色
    warn: '\x1b[33m', // 黄色
    error: '\x1b[31m', // 红色
    gray: '\x1b[90m', // 灰色用于时间戳
};

export class Logger {
    private topic: string = '';

    private formatArray(arr: any[]): string {
        const MAX_LINES = 70;
        const MAX_LENGTH = 100;

        const truncateString = (str: string): string => {
            return str.length > MAX_LENGTH ? str.slice(0, MAX_LENGTH) + '...' : str;
        };

        const truncateObject = (obj: any): any => {
            if (typeof obj !== 'object' || obj === null) {
                return typeof obj === 'string' ? truncateString(obj) : obj;
            }

            const result: any = Array.isArray(obj) ? [] : {};
            for (const [key, value] of Object.entries(obj)) {
                result[key] =
                    typeof value === 'string'
                        ? truncateString(value)
                        : typeof value === 'object'
                            ? truncateObject(value)
                            : value;
            }
            return result;
        };

        const items = arr.slice(0, MAX_LINES).map((item) => {
            const truncatedItem = truncateObject(item);
            // 使用2个空格缩进，并在每行前添加 "  • "
            const jsonString = JSON.stringify(truncatedItem, null, 2)
                .split('\n')
                .map((line, index) => (index === 0 ? `  • ${line}` : `    ${line}`))
                .join('\n');
            return jsonString;
        });

        let output = items.join('\n');
        if (arr.length > MAX_LINES) {
            const remainingCount = arr.length - MAX_LINES;
            output += `\n  ⋮ ... and ${remainingCount} more items`;
        }

        return output;
    }

    private log(level: LogLevel, message: string | object | any[], newLine: boolean = false) {
        // 使用本地时间，并格式化为 HH:mm:ss 格式
        const timestamp = new Date().toLocaleTimeString('zh-CN', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        const formattedMessage = Array.isArray(message)
            ? this.formatArray(message)
            : typeof message === 'object'
                ? JSON.stringify(message, null, 2)
                : message;

        const timestampPart = SHOW_TIMESTAMP ? `${colors.gray}${timestamp}${colors.reset} ` : '';

        const emoji = {
            debug: '🔍',
            info: '🐳',
            warn: '🚨',
            error: '❌',
        }[level];

        if (newLine) {
            console.log("")
        }

        console.log(
            timestampPart +
            `${colors[level]}${emoji} ` +
            this.getPrefix() +
            `${level.toUpperCase()}${colors.reset} ` +
            `${colors.gray}:${colors.reset} ` +
            `${colors[level]}${formattedMessage}${colors.reset}`
        );
    }

    private getPrefix() {
        return this.topic ? `[${this.topic}] ` : '';
    }

    constructor(topic: string = '') {
        this.topic = topic;
    }

    debug(message: string | object) {
        this.log('debug', message);
    }

    info(message: string | object) {
        this.log('info', message);
    }

    warn(message: string | object) {
        this.log('warn', message);
    }

    error(message: string | object) {
        this.log('error', message, true);
    }

    array(title: string, arr: any[]) {
        this.log('info', title + '\n' + this.formatArray(arr));
    }
}

export const defaultLogger = new Logger();