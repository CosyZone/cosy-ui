import Grid from './Grid.astro';
import GridBasic from './GridBasic.astro';
import BasicSourceCode from './GridBasic.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Grid, GridBasic };

// 导出示例源代码
export const GridExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Grid'),
};
