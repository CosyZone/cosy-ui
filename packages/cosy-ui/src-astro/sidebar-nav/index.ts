import SidebarNav from './SidebarNav.astro';
import SidebarNavBasic from './SidebarNavBasic.astro';
import BasicSourceCode from './SidebarNavBasic.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { SidebarNav, SidebarNavBasic };

// 导出示例源代码
export const SidebarNavExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'SidebarNav'),
};
