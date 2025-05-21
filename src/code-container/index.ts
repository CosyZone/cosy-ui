import { default as CodeContainer } from './CodeContainer.astro';
import { default as CodeContainerBasic } from './CodeContainerBasic.astro';
import { default as CodeContainerMultiple } from './CodeContainerMultiple.astro';
import BasicSourceCode from './CodeContainerBasic.astro?raw';
import MultipleSourceCode from './CodeContainerMultiple.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { CodeContainer, CodeContainerBasic, CodeContainerMultiple };

// 导出示例源代码
export const CodeContainerExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'CodeContainer'),
  Multiple: extractSimpleExample(MultipleSourceCode, 'CodeContainer'),
};