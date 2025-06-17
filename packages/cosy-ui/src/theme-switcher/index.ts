import ThemeSwitcher from './ThemeSwitcher.astro';
import ThemeSwitcherBasic from './ThemeSwitcherBasic.astro';
import BasicSourceCode from './ThemeSwitcherBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { ThemeSwitcher, ThemeSwitcherBasic };

// 导出示例源代码
export const ThemeSwitcherExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'ThemeSwitcher'),
};
