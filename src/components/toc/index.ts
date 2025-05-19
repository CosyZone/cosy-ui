import TableOfContents from './TableOfContents.astro';
import TableOfContentsBasic from './TableOfContentsBasic.astro';
import BasicSourceCode from './TableOfContentsBasic.astro?raw';
import { extractSimpleExample } from '../../utils/component';

export { TableOfContents, TableOfContentsBasic };

// 导出示例源代码
export const TableOfContentsExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'TableOfContents'),
};
