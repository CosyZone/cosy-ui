import type { MacWindowBgType } from '../../src/utils/mac-window-bg';

export interface MacWindowProps {
    height?: string;
    title?: string;
    withShadow?: boolean;
    tabs?: string[];
    defaultTab?: string;
    id?: string;
    bgType?: MacWindowBgType;
} 
