import { extractSimpleExample } from "../../utils/component";
import Basic from "../../../src/BlogBasic.vue";
import BasicSource from "../../../src/BlogBasic.vue?raw";
import Empty from "../../../src/Empty.vue";
import EmptySource from "../../../src/Empty.vue?raw";
import EmptyEnglish from "../../../src/EmptyEnglish.vue";
import EmptyEnglishSource from "../../../src/EmptyEnglish.vue?raw";
import English from "../../../src/English.vue";
import EnglishSource from "../../../src/English.vue?raw";

export type { IBlog } from "../../../src/BlogList.vue";
// 导出主组件
export { default as BlogList } from "../../../src/BlogList.vue";

// 将示例组件整合为一个对象导出
export const BlogListExamples = {
	Basic,
	Empty,
	English,
	EmptyEnglish,
};

// 导出示例组件的源代码（简化版本）
export const BlogListExampleCodes = {
	Basic: extractSimpleExample(BasicSource, "BlogList"),
	Empty: extractSimpleExample(EmptySource, "BlogList"),
	English: extractSimpleExample(EnglishSource, "BlogList"),
	EmptyEnglish: extractSimpleExample(EmptyEnglishSource, "BlogList"),
};
