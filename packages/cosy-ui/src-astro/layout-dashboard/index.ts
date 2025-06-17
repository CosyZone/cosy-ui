import DashboardLayout from './DashboardLayout.astro';
import DashboardLayoutBasic from './DashboardLayoutBasic.astro';
import BasicSourceCode from './DashboardLayoutBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { DashboardLayout, DashboardLayoutBasic };

// 导出示例源代码
export const DashboardLayoutExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'DashboardLayout'),
};
