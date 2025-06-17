import LanguageSwitcher from './LanguageSwitcher.astro';
import LanguageSwitcherBasic from './LanguageSwitcherBasic.astro';
import BasicSourceCode from './LanguageSwitcherBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { LanguageSwitcher, LanguageSwitcherBasic };

// 导出示例源代码
export const LanguageSwitcherExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'LanguageSwitcher'),
};
