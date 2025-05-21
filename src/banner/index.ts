import Banner from './Banner.astro';
import BannerBasic from './BannerBasic.astro';
import BannerPrimary from './BannerPrimary.astro';
import BannerSecondary from './BannerSecondary.astro';
import BannerSuccess from './BannerSuccess.astro';
import BannerWarning from './BannerWarning.astro';
import BannerDanger from './BannerDanger.astro';
import BannerInfo from './BannerInfo.astro';
import BannerCustomStyle from './BannerCustomStyle.astro';
import BannerFadeIn from './BannerFadeIn.astro';
import BannerSlideUp from './BannerSlideUp.astro';
import BannerAllAnimations from './BannerAllAnimations.astro';
import BasicSourceCode from './BannerBasic.astro?raw';
import PrimarySourceCode from './BannerPrimary.astro?raw';
import SecondarySourceCode from './BannerSecondary.astro?raw';
import SuccessSourceCode from './BannerSuccess.astro?raw';
import WarningSourceCode from './BannerWarning.astro?raw';
import DangerSourceCode from './BannerDanger.astro?raw';
import InfoSourceCode from './BannerInfo.astro?raw';
import CustomStyleSourceCode from './BannerCustomStyle.astro?raw';
import FadeInSourceCode from './BannerFadeIn.astro?raw';
import SlideUpSourceCode from './BannerSlideUp.astro?raw';
import AllAnimationsSourceCode from './BannerAllAnimations.astro?raw';
import { extractSimpleExample } from '../utils/component';

export { Banner, BannerBasic, BannerPrimary, BannerSecondary, BannerSuccess, BannerWarning, BannerDanger, BannerInfo, BannerCustomStyle, BannerFadeIn, BannerSlideUp, BannerAllAnimations };

// 导出示例源代码
export const BannerExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Banner'),
  Primary: extractSimpleExample(PrimarySourceCode, 'Banner'),
  Secondary: extractSimpleExample(SecondarySourceCode, 'Banner'),
  Success: extractSimpleExample(SuccessSourceCode, 'Banner'),
  Warning: extractSimpleExample(WarningSourceCode, 'Banner'),
  Danger: extractSimpleExample(DangerSourceCode, 'Banner'),
  Info: extractSimpleExample(InfoSourceCode, 'Banner'),
  CustomStyle: extractSimpleExample(CustomStyleSourceCode, 'Banner'),
  FadeIn: extractSimpleExample(FadeInSourceCode, 'Banner'),
  SlideUp: extractSimpleExample(SlideUpSourceCode, 'Banner'),
  AllAnimations: extractSimpleExample(AllAnimationsSourceCode, 'Banner'),
};