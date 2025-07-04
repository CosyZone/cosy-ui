/**
 * BannerBox组件的尺寸预设列表
 * 包含各种常用尺寸和比例
 */

export interface SizePreset {
  name: string;
  width: string;
  height: string;
}

export const sizePresets: SizePreset[] = [
  { name: 'Default', width: 'cosy:w-full', height: 'cosy:h-full' },
  { name: 'Square', width: 'cosy:w-[600px]', height: 'cosy:h-[600px]' },
  { name: 'Landscape', width: 'cosy:w-[800px]', height: 'cosy:h-[450px]' },
  { name: 'Portrait', width: 'cosy:w-[450px]', height: 'cosy:h-[800px]' },
  { name: 'Wide', width: 'cosy:w-[1200px]', height: 'cosy:h-[675px]' },
  { name: 'Banner', width: 'cosy:w-[1200px]', height: 'cosy:h-[300px]' },
  { name: '1280 × 800', width: 'cosy:w-[1280px]', height: 'cosy:h-[800px]' },
  { name: '1440 × 900', width: 'cosy:w-[1440px]', height: 'cosy:h-[900px]' },
  { name: '2560 × 1600', width: 'cosy:w-[2560px]', height: 'cosy:h-[1600px]' },
  { name: '2880 × 1800', width: 'cosy:w-[2880px]', height: 'cosy:h-[1800px]' },
];
