import Header from './Header.astro';
import HeaderBasic from './HeaderBasic.astro';
import HeaderWithNavigation from './HeaderWithNavigation.astro';
import HeaderCustomPosition from './HeaderCustomPosition.astro';
import HeaderCustomNavbarEnd from './HeaderCustomNavbarEnd.astro';
import HeaderCustomNavbarStart from './HeaderCustomNavbarStart.astro';
import HeaderCustomNavbarCenter from './HeaderCustomNavbarCenter.astro';
import BasicSourceCode from './HeaderBasic.astro?raw';
import WithNavigationSourceCode from './HeaderWithNavigation.astro?raw';
import CustomPositionSourceCode from './HeaderCustomPosition.astro?raw';
import CustomNavbarEndSourceCode from './HeaderCustomNavbarEnd.astro?raw';
import CustomNavbarStartSourceCode from './HeaderCustomNavbarStart.astro?raw';
import CustomNavbarCenterSourceCode from './HeaderCustomNavbarCenter.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Header, HeaderBasic, HeaderWithNavigation, HeaderCustomPosition, HeaderCustomNavbarEnd, HeaderCustomNavbarStart, HeaderCustomNavbarCenter };

// 导出示例源代码
export const HeaderExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Header'),
	WithNavigation: extractSimpleExample(WithNavigationSourceCode, 'Header'),
	CustomPosition: extractSimpleExample(CustomPositionSourceCode, 'Header'),
	CustomNavbarEnd: extractSimpleExample(CustomNavbarEndSourceCode, 'Header'),
	CustomNavbarStart: extractSimpleExample(CustomNavbarStartSourceCode, 'Header'),
	CustomNavbarCenter: extractSimpleExample(CustomNavbarCenterSourceCode, 'Header'),
};