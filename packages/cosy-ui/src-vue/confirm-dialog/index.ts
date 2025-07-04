import Basic from './Basic.vue';
import CustomButtons from './CustomButtons.vue';
import BasicSource from './Basic.vue?raw';
import CustomButtonsSource from './CustomButtons.vue?raw';
import { extractSimpleExample } from '../../src/utils/component';

// 导出主组件
export { default as ConfirmDialog } from './ConfirmDialog.vue';

// 导出示例组件
export const ConfirmDialogExamples = {
  Basic,
  CustomButtons,
};

// 导出示例源代码
export const ConfirmDialogExampleCodes = {
  Basic: extractSimpleExample(BasicSource, 'ConfirmDialog'),
  CustomButtons: extractSimpleExample(CustomButtonsSource, 'ConfirmDialog'),
};
