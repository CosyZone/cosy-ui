import Link from './Link.astro';
import LinkBasic from './LinkBasic.astro';
import LinkVariants from './LinkVariants.astro';
import LinkAnimations from './LinkAnimations.astro';
import BasicSourceCode from './LinkBasic.astro?raw';
import VariantsSourceCode from './LinkVariants.astro?raw';
import AnimationsSourceCode from './LinkAnimations.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Link, LinkBasic, LinkVariants, LinkAnimations };

// 导出示例源代码
export const LinkExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Link'),
  Variants: extractSimpleExample(VariantsSourceCode, 'Link'),
  Animations: extractSimpleExample(AnimationsSourceCode, 'Link'),
};
