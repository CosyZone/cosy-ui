export { default as ListItem } from './ListItem.astro';

export type ListItemProps = {
    loading?: boolean;
    duration?: number; // 进度条动画时长，毫秒
    animationType?: 'ring' | 'icon-left' | 'icon-right' | 'breath' | 'pulse' | 'glow'; // 无限动画类型，默认 'ring'
}; 
