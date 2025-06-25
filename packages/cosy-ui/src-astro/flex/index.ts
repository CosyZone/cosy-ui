import Flex from './Flex.astro';
import FlexBasic from './FlexBasic.astro';
import BasicSourceCode from './FlexBasic.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { Flex, FlexBasic };

// 导出示例源代码
export const FlexExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Flex'),
};
