/**
 * 命令接口
 */
export interface ICommand {
    /**
     * 获取命令名称
     */
    getName(): string;

    /**
     * 获取命令描述
     */
    getDescription(): string;

    /**
     * 执行命令
     * @param args 命令参数
     */
    execute(args: string[]): Promise<void>;
}


/**
 * 基础命令类
 */
export abstract class BaseCommand implements ICommand {
    protected name: string;
    protected description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    abstract execute(args: string[]): Promise<void>;
}



/**
 * 命令注册选项
 */
export interface CommandOptions {
    /**
     * 命令名称
     */
    name: string;

    /**
     * 命令描述
     */
    description: string;

    /**
     * 命令别名
     */
    aliases?: string[];

    /**
     * 命令参数定义
     */
    arguments?: CommandArgument[];

    /**
     * 命令选项定义
     */
    options?: CommandOption[];
}

/**
 * 命令参数定义
 */
export interface CommandArgument {
    /**
     * 参数名称
     */
    name: string;

    /**
     * 参数描述
     */
    description: string;

    /**
     * 是否必需
     */
    required?: boolean;

    /**
     * 默认值
     */
    default?: string;
}

/**
 * 命令选项定义
 */
export interface CommandOption {
    /**
     * 选项名称
     */
    name: string;

    /**
     * 选项描述
     */
    description: string;

    /**
     * 选项别名
     */
    alias?: string;

    /**
     * 是否必需
     */
    required?: boolean;

    /**
     * 默认值
     */
    default?: string | boolean;

    /**
     * 是否是标志选项（不需要值）
     */
    isFlag?: boolean;
} 
