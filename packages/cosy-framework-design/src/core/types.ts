import { ApplicationStatus as ApplicationStatusEnum } from './constants';

/**
 * 应用程序状态信息
 */
export interface ApplicationStatus {
    running: boolean;
    uptime: number;
    memory: NodeJS.MemoryUsage;
    cpu: NodeJS.CpuUsage;
}

/**
 * 应用程序指标
 */
export interface ApplicationMetrics {
    requests: {
        total: number;
        active: number;
        errors: number;
    };
    response: {
        avg: number;
        min: number;
        max: number;
    };
}

/**
 * 健康检查函数
 */
export type HealthCheck = () => Promise<boolean>;

/**
 * 健康检查结果
 */
export type HealthCheckResult = Record<string, boolean>;

/**
 * 状态变更回调
 */
export type StatusChangeCallback = (status: ApplicationStatus) => void;

// 占位符类型
export type TCoreTemp = string;
