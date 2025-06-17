import Speak from './Speak.astro';
import SpeakBasic from './SpeakBasic.astro';
import SpeakGrid from './SpeakGrid.astro';
import BasicSourceCode from './SpeakBasic.astro?raw';
import GridSourceCode from './SpeakGrid.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Speak, SpeakBasic, SpeakGrid };

// 导出示例源代码
export const SpeakExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Speak'),
  Grid: extractSimpleExample(GridSourceCode, 'Speak'),
};
