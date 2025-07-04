import Basic from './ExampleBasic.vue';
import CustomBg from './ExampleCustomBg.vue';
import DisplayModeAlways from './ExampleDisplayModeAlways.vue';
import DisplayModeHover from './ExampleDisplayModeHover.vue';
import DisplayModeNever from './ExampleDisplayModeNever.vue';
import SmartBanner from './SmartBanner.vue';
import SizePreset from './ExampleSizePreset.vue';
import ImageExport from './ExampleImageExport.vue';
import BasicSource from './ExampleBasic.vue?raw';
import CustomBgSource from './ExampleCustomBg.vue?raw';
import DisplayModeAlwaysSource from './ExampleDisplayModeAlways.vue?raw';
import DisplayModeHoverSource from './ExampleDisplayModeHover.vue?raw';
import DisplayModeNeverSource from './ExampleDisplayModeNever.vue?raw';
import SmartBannerSource from './SmartBanner.vue?raw';
import SizePresetSource from './ExampleSizePreset.vue?raw';
import ImageExportSource from './ExampleImageExport.vue?raw';
import { extractSimpleExample } from '../../src/utils/component';

// 获取 BannerBox 和 FeatureCard 组件
export { default as BannerBox } from './BannerBox.vue';
export { default as FeatureCard } from './FeatureCard.vue';
export { default as DownloadButton } from './DownloadButton.vue';
export { bgClasses } from './bgStyles';
export { sizePresets, type SizePreset } from './sizePresets';

// 导出示例组件
export const BannerBoxExamples = {
  Basic,
  CustomBg,
  DisplayModeAlways,
  DisplayModeHover,
  DisplayModeNever,
  SmartBanner,
  SizePreset,
  ImageExport,
};

// 导出示例源代码
export const BannerBoxExampleCodes = {
  Basic: extractSimpleExample(BasicSource, 'BannerBox'),
  CustomBg: extractSimpleExample(CustomBgSource, 'BannerBox'),
  DisplayModeAlways: extractSimpleExample(DisplayModeAlwaysSource, 'BannerBox'),
  DisplayModeHover: extractSimpleExample(DisplayModeHoverSource, 'BannerBox'),
  DisplayModeNever: extractSimpleExample(DisplayModeNeverSource, 'BannerBox'),
  SmartBanner: extractSimpleExample(SmartBannerSource, 'BannerBox'),
  SizePreset: extractSimpleExample(SizePresetSource, 'BannerBox'),
  ImageExport: extractSimpleExample(ImageExportSource, 'BannerBox'),
};
