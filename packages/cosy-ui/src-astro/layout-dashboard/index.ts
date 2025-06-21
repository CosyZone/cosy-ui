import DashboardLayout from './DashboardLayout.astro';
import DashboardLayoutBasic from './DashboardLayoutBasic.astro';
import EDashboardLayoutCustomStyle from './EDashboardLayoutCustomStyle.astro';
import EDashboardLayoutBasicContainer from './EDashboardLayoutBasicContainer.astro';
import EDashboardLayoutCustomStyleContainer from './EDashboardLayoutCustomStyleContainer.astro';
import BasicSourceCode from './DashboardLayoutBasic.astro?raw';
import CustomStyleSourceCode from './EDashboardLayoutCustomStyle.astro?raw';
import { extractSimpleExample } from '../utils/component';

export {
  DashboardLayout,
  DashboardLayoutBasic,
  EDashboardLayoutCustomStyle,
  EDashboardLayoutBasicContainer,
  EDashboardLayoutCustomStyleContainer
};

// 导出示例源代码
export const DashboardLayoutExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'DashboardLayout'),
  CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'DashboardLayout'),
};

// 导出ComponentPackage
export const DashboardLayoutPackage = {
  DashboardLayout,
  DashboardLayoutContainers: {
    Basic: EDashboardLayoutBasicContainer,
    CustomStyle: EDashboardLayoutCustomStyleContainer,
  },
};
