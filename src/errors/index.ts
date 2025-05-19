import Error404 from './404.astro';
import Error404Basic from './404Basic.astro';
import BasicSourceCode from './404Basic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Error404, Error404Basic };

// 导出示例源代码
export const Error404ExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Error404'),
};
