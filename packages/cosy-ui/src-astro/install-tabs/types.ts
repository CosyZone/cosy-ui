export interface InstallTabsProps {
    /** 要安装的包名 */
    packageName: string;
    /** 支持的包管理器，默认['npm','pnpm','yarn'] */
    managers?: string[];
    /** 是否为开发依赖 */
    dev?: boolean;
} 
