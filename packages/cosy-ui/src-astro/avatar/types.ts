import type { HTMLAttributes } from 'astro/types';

export interface AvatarProps extends HTMLAttributes<'div'> {
    /**
     * 用户名称
     */
    userName: string;

    /**
     * 用户头像URL
     */
    avatar?: string;

    /**
     * 头像尺寸
     * @default 'md'
     */
    size?: 'sm' | 'md' | 'lg' | 'xl';

    /**
     * 自定义类名
     */
    class?: string;

    /**
     * 类名列表
     */
    'class:list'?: any;
}
