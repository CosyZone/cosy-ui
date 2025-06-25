import Image from './Image.astro';
import ImageBasic from './ImageBasic.astro';
import ImageEffects from './ImageEffects.astro';
import ImageLoading from './ImageLoading.astro';
import BasicSourceCode from './ImageBasic.astro?raw';
import EffectsSourceCode from './ImageEffects.astro?raw';
import LoadingSourceCode from './ImageLoading.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { Image, ImageBasic, ImageEffects, ImageLoading };

// 导出示例源代码
export const ImageExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Image'),
  Effects: extractSimpleExample(EffectsSourceCode, 'Image'),
  Loading: extractSimpleExample(LoadingSourceCode, 'Image'),
};
