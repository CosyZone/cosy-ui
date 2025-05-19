import Sidebar from './Sidebar.astro';
import SidebarBasic from './SidebarBasic.astro';
import BasicSourceCode from './SidebarBasic.astro?raw';
import { extractSimpleExample } from '../../utils/component';

export { Sidebar, SidebarBasic };

// 导出示例源代码
export const SidebarExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Sidebar'),
};
