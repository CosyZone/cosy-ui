import ThemeItem from './ThemeItem.astro';
import ThemeItemBasic from './ThemeItemBasic.astro';
import BasicSourceCode from './ThemeItemBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { ThemeItem, ThemeItemBasic };

// 导出示例源代码
export const ThemeItemExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'ThemeItem'),
};
