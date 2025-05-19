import BaseLayout from './BaseLayout.astro';
import BaseLayoutBasic from './BaseLayoutBasic.astro';
import BasicSourceCode from './BaseLayoutBasic.astro?raw';
import { extractSimpleExample } from '../../utils/component';

export { BaseLayout, BaseLayoutBasic };

// 导出示例源代码
export const BaseLayoutExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'BaseLayout'),
};
