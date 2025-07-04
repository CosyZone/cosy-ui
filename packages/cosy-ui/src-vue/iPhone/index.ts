import Basic from './Basic.vue';
import WeatherApp from './WeatherApp.vue';
import NoFrame from './NoFrame.vue';
import CustomBackground from './CustomBackground.vue';
import BasicSource from './Basic.vue?raw';
import NoFrameSource from './NoFrame.vue?raw';
import CustomBackgroundSource from './CustomBackground.vue?raw';
import WeatherAppSource from './WeatherApp.vue?raw';
import { extractSimpleExample } from '../../utils/component';

// 导出主组件
export { default as iPhoneWindow } from './iPhoneWindow.vue';

// 将示例组件整合为一个对象导出
export const iPhoneWindowExamples = {
  Basic,
  WeatherApp,
  NoFrame,
  CustomBackground,
};

// 导出示例组件的源代码（简化版本）
export const iPhoneWindowExampleCodes = {
  Basic: extractSimpleExample(BasicSource, 'iPhoneWindow'),
  NoFrame: extractSimpleExample(NoFrameSource, 'iPhoneWindow'),
  CustomBackground: extractSimpleExample(
    CustomBackgroundSource,
    'iPhoneWindow'
  ),
  WeatherApp: extractSimpleExample(WeatherAppSource, 'iPhoneWindow'),
};
