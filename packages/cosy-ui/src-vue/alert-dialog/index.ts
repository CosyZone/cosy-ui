import Basic from "./Basic.vue";
import Multilang from "./Multilang.vue";
import BasicSource from "./Basic.vue?raw";
import MultilangSource from "./Multilang.vue?raw";
import { extractSimpleExample } from "../../src/utils/component";

// 导出主组件
export { default as AlertDialog } from "./AlertDialog.vue";

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
