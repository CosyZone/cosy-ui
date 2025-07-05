import Basic from './Basic.vue';
import NoFrame from './NoFrame.vue';
import CustomBackground from './CustomBackground.vue';
import BasicSource from './Basic.vue?raw';
import NoFrameSource from './NoFrame.vue?raw';
import CustomBackgroundSource from './CustomBackground.vue?raw';
import { extractSimpleExample } from '../utils/component';

// 导出主组件
export { default as iPhoneWindow } from './iPhoneWindow.vue';

// 将示例组件整合为一个对象导出
export const iPhoneWindowExamples = {
    Basic,
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
};
