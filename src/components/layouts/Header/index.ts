import Header from './Header.astro';
import HeaderBasic from './HeaderBasic.astro';
import HeaderWithNavigation from './HeaderWithNavigation.astro';
import HeaderCustomPosition from './HeaderCustomPosition.astro';
import HeaderCustomNavbarEnd from './HeaderCustomNavbarEnd.astro';
import BasicSourceCode from './HeaderBasic.astro?raw';
import { extractSimpleExample } from '../../../utils/component';

export { Header, HeaderBasic, HeaderWithNavigation, HeaderCustomPosition, HeaderCustomNavbarEnd };

// 导出示例源代码
export const HeaderExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Header'),
};
