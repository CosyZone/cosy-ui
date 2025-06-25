import NavSection from './NavSection.astro';
import NavSectionBasic from './NavSectionBasic.astro';
import BasicSourceCode from './NavSectionBasic.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { NavSection, NavSectionBasic };

// 导出示例源代码
export const NavSectionExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'NavSection'),
};
