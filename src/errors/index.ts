import Error404 from './404.astro';
import Error403 from './403.astro';
import Error500 from './500.astro';
import Error503 from './503.astro';
import ErrorPage from './ErrorPage.astro';

import Error404Basic from './404Basic.astro';
import E404Basic from './E404Basic.astro';
import E404WithDebug from './E404WithDebug.astro';
import E403Basic from './E403Basic.astro';
import E500Basic from './E500Basic.astro';
import E503Maintenance from './E503Maintenance.astro';

import E404BasicContainer from './E404BasicContainer.astro';
import E403BasicContainer from './E403BasicContainer.astro';
import E500BasicContainer from './E500BasicContainer.astro';
import E503MaintenanceContainer from './E503MaintenanceContainer.astro';
import EErrorPageShowcase from './EErrorPageShowcase.astro';
import EErrorPageShowcaseContainer from './EErrorPageShowcaseContainer.astro';
import EErrorPageCustomStyle from './EErrorPageCustomStyle.astro';
import EErrorPageCustomStyleContainer from './EErrorPageCustomStyleContainer.astro';

import BasicSourceCode from './E404Basic.astro?raw';
import WithDebugSourceCode from './E404WithDebug.astro?raw';
import Error403SourceCode from './E403Basic.astro?raw';
import Error500SourceCode from './E500Basic.astro?raw';
import Error503SourceCode from './E503Maintenance.astro?raw';

import { extractSimpleExample } from '../utils/component';

export {
	Error404,
	Error403,
	Error500,
	Error503,
	ErrorPage,
	Error404Basic,
	E404Basic,
	E404WithDebug,
	E403Basic,
	E500Basic,
	E503Maintenance,
	E404BasicContainer,
	E403BasicContainer,
	E500BasicContainer,
	E503MaintenanceContainer,
	EErrorPageShowcase,
	EErrorPageShowcaseContainer,
	EErrorPageCustomStyle,
	EErrorPageCustomStyleContainer
};

// 错误页面组件包
export const ErrorPackage = {
	ErrorPage,
	Error404,
	Error403,
	Error500,
	Error503,
	ErrorContainers: {
		Basic404: E404BasicContainer,
		Basic403: E403BasicContainer,
		Basic500: E500BasicContainer,
		Maintenance503: E503MaintenanceContainer,
		Showcase: EErrorPageShowcaseContainer,
		CustomStyle: EErrorPageCustomStyleContainer,
	},
};

// 导出示例源代码
export const ErrorExampleCodes = {
	Basic404: extractSimpleExample(BasicSourceCode, 'Error404'),
	WithDebug404: extractSimpleExample(WithDebugSourceCode, 'Error404'),
	Basic403: extractSimpleExample(Error403SourceCode, 'Error403'),
	Basic500: extractSimpleExample(Error500SourceCode, 'Error500'),
	Maintenance503: extractSimpleExample(Error503SourceCode, 'Error503'),
};
