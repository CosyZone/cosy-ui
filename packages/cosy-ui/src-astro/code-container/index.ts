import { default as CodeContainer } from './CodeContainer.astro';
import { default as CodeContainerBasic } from './ECodeContainerBasic.astro';
import { default as CodeContainerMultiple } from './ECodeContainerMultiple.astro';
import { default as CodeContainerIsolation } from './ECodeContainerIsolation.astro';
import { default as ECodeContainerBasicContainer } from './ECodeContainerBasicContainer.astro';
import { default as ECodeContainerMultipleContainer } from './ECodeContainerMultipleContainer.astro';
import { default as ECodeContainerIsolationContainer } from './ECodeContainerIsolationContainer.astro';
import BasicSourceCode from './ECodeContainerBasic.astro?raw';
import MultipleSourceCode from './ECodeContainerMultiple.astro?raw';
import IsolationSourceCode from './ECodeContainerIsolation.astro?raw';
import { extractSimpleExample } from '../utils/component';

export {
  CodeContainer,
  CodeContainerBasic,
  CodeContainerMultiple,
  CodeContainerIsolation,
  ECodeContainerBasicContainer,
  ECodeContainerMultipleContainer,
  ECodeContainerIsolationContainer
};

// 导出示例源代码
export const CodeContainerExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'CodeContainer'),
  Multiple: extractSimpleExample(MultipleSourceCode, 'CodeContainer'),
  Isolation: extractSimpleExample(IsolationSourceCode, 'CodeContainer'),
};

// 导出ComponentPackage
export const CodeContainerPackage = {
  CodeContainer,
  CodeContainerContainers: {
    Basic: ECodeContainerBasicContainer,
    Multiple: ECodeContainerMultipleContainer,
    Isolation: ECodeContainerIsolationContainer,
  },
};
