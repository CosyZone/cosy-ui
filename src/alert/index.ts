import Alert from './Alert.astro';
import AlertBasic from './AlertBasic.astro';
import AlertWithTitle from './AlertWithTitle.astro';
import AlertTypes from './AlertTypes.astro';
import AlertCustomStyle from './AlertCustomStyle.astro';
import BasicSourceCode from './AlertBasic.astro?raw';
import WithTitleSourceCode from './AlertWithTitle.astro?raw';
import TypesSourceCode from './AlertTypes.astro?raw';
import CustomStyleSourceCode from './AlertCustomStyle.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Alert, AlertBasic, AlertWithTitle, AlertTypes, AlertCustomStyle };

// 导出示例源代码
export const AlertExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Alert'),
	WithTitle: extractSimpleExample(WithTitleSourceCode, 'Alert'),
	Types: extractSimpleExample(TypesSourceCode, 'Alert'),
	CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'Alert'),
};
