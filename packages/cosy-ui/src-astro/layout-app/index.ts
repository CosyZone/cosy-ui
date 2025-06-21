import AppLayout from './AppLayout.astro';
import AppLayoutBasic from './AppLayoutBasic.astro';
import EAppLayoutCustomStyle from './EAppLayoutCustomStyle.astro';
import EAppLayoutBasicContainer from './EAppLayoutBasicContainer.astro';
import EAppLayoutCustomStyleContainer from './EAppLayoutCustomStyleContainer.astro';
import BasicSourceCode from './AppLayoutBasic.astro?raw';
import CustomStyleSourceCode from './EAppLayoutCustomStyle.astro?raw';
import { extractSimpleExample } from '../utils/component';

export {
  AppLayout,
  AppLayoutBasic,
  EAppLayoutCustomStyle,
  EAppLayoutBasicContainer,
  EAppLayoutCustomStyleContainer
};

// 导出示例源代码
export const AppLayoutExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'AppLayout'),
  CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'AppLayout'),
};

// 导出ComponentPackage
export const AppLayoutPackage = {
  AppLayout,
  AppLayoutContainers: {
    Basic: EAppLayoutBasicContainer,
    CustomStyle: EAppLayoutCustomStyleContainer,
  },
};
