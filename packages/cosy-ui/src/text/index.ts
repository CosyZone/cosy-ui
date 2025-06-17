import Text from './Text.astro';
import TextBasic from './TextBasic.astro';
import BasicSourceCode from './TextBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Text, TextBasic };

// 导出示例源代码
export const TextExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Text'),
};
