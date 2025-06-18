import { default as CodeContainer } from './CodeContainer.astro';
import { default as CodeContainerBasic } from './ECodeContainerBasic.astro';
import { default as CodeContainerMultiple } from './ECodeContainerMultiple.astro';
import BasicSourceCode from './ECodeContainerBasic.astro?raw';
import MultipleSourceCode from './ECodeContainerMultiple.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { CodeContainer, CodeContainerBasic, CodeContainerMultiple };

// 导出示例源代码
export const CodeContainerExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'CodeContainer'),
  Multiple: extractSimpleExample(MultipleSourceCode, 'CodeContainer'),
};
