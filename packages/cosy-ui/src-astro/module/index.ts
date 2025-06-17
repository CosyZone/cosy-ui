import Module from './Module.astro';
import ModuleBasic from './ModuleBasic.astro';
import ModuleGrid from './ModuleGrid.astro';
import ModuleCustom from './ModuleCustom.astro';
import BasicSourceCode from './ModuleBasic.astro?raw';
import GridSourceCode from './ModuleGrid.astro?raw';
import CustomSourceCode from './ModuleCustom.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Module, ModuleBasic, ModuleGrid, ModuleCustom };

// 导出示例源代码
export const ModuleExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Module'),
  Grid: extractSimpleExample(GridSourceCode, 'Module'),
  Custom: extractSimpleExample(CustomSourceCode, 'Module'),
};
