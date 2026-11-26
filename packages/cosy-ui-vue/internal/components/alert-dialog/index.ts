import { extractSimpleExample } from "../../utils/component";
import Basic from "../../../src/AlertDialogBasic.vue";
import BasicSource from "../../../src/AlertDialogBasic.vue?raw";
import Multilang from "../../../src/Multilang.vue";
import MultilangSource from "../../../src/Multilang.vue?raw";

// 导出主组件
export { default as AlertDialog } from "../../../src/AlertDialog.vue";

// 导出示例组件
export const AlertDialogExamples = {
	Basic,
	Multilang,
};

// 导出示例源代码
export const AlertDialogExampleCodes = {
	Basic: extractSimpleExample(BasicSource, "Basic"),
	Multilang: extractSimpleExample(MultilangSource, "Multilang"),
};
