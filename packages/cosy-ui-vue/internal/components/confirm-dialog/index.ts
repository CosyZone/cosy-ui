import { extractSimpleExample } from "../../utils/component";
import Basic from "../../../src/ConfirmDialogBasic.vue";
import BasicSource from "../../../src/ConfirmDialogBasic.vue?raw";
import CustomButtons from "../../../src/CustomButtons.vue";
import CustomButtonsSource from "../../../src/CustomButtons.vue?raw";

// 导出主组件
export { default as ConfirmDialog } from "../../../src/ConfirmDialog.vue";

// 导出示例组件
export const ConfirmDialogExamples = {
	Basic,
	CustomButtons,
};

// 导出示例源代码
export const ConfirmDialogExampleCodes = {
	Basic: extractSimpleExample(BasicSource, "ConfirmDialog"),
	CustomButtons: extractSimpleExample(CustomButtonsSource, "ConfirmDialog"),
};
