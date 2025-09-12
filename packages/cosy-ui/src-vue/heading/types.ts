import type { BackgroundColor } from '../../src/common/backgrounds';

export interface IHeadingProps {
    align?: 'left' | 'center' | 'right';
    anchor?: boolean;
    background?: BackgroundColor;
    color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'muted'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'base-content'
    | 'neutral-content';
    class?: string;
    external?: boolean;
    href?: string;
    id?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    underline?: boolean;
    weight?:
    | 'thin'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semibold'
    | 'bold'
    | 'extrabold'
    | 'black';
}

