import Button from './Button.astro';
import ButtonBasic from './ButtonBasic.astro';
import ButtonSizes from './ButtonSizes.astro';
import ButtonStates from './ButtonStates.astro';
import ButtonWithIcons from './ButtonWithIcons.astro';
import ButtonShapes from './ButtonShapes.astro';
import BasicSourceCode from './ButtonBasic.astro?raw';
import SizesSourceCode from './ButtonSizes.astro?raw';
import StatesSourceCode from './ButtonStates.astro?raw';
import WithIconsSourceCode from './ButtonWithIcons.astro?raw';
import ShapesSourceCode from './ButtonShapes.astro?raw';
import { extractSimpleExample } from '../../utils/component';

export { Button, ButtonBasic, ButtonSizes, ButtonStates, ButtonWithIcons, ButtonShapes };

// 导出示例源代码
export const ButtonExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, 'Button'),
	Sizes: extractSimpleExample(SizesSourceCode, 'Button'),
	States: extractSimpleExample(StatesSourceCode, 'Button'),
	WithIcons: extractSimpleExample(WithIconsSourceCode, 'Button'),
	Shapes: extractSimpleExample(ShapesSourceCode, 'Button'),
};
