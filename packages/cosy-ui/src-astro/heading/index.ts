import Heading from './Heading.astro';
import HeadingBasic from './HeadingBasic.astro';
import BasicSourceCode from './HeadingBasic.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { Heading, HeadingBasic };

// 导出示例源代码
export const HeadingExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Heading'),
};
