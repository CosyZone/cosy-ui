import Footer from './Footer.astro';
import FooterBasic from './FooterBasic.astro';
import BasicSourceCode from './FooterBasic.astro?raw';
import { extractSimpleExample } from '../../utils/component';

export { Footer, FooterBasic };

// 导出示例源代码
export const FooterExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Footer'),
};
