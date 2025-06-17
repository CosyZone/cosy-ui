import AppLayout from './AppLayout.astro';
import AppLayoutBasic from './AppLayoutBasic.astro';
import BasicSourceCode from './AppLayoutBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { AppLayout, AppLayoutBasic };

// 导出示例源代码
export const AppLayoutExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'AppLayout'),
};
