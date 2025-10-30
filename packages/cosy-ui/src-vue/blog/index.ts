import { extractSimpleExample } from "../../src/utils/component";
import Basic from "./Basic.vue";
import BasicSource from "./Basic.vue?raw";
import Empty from "./Empty.vue";
import EmptySource from "./Empty.vue?raw";
import EmptyEnglish from "./EmptyEnglish.vue";
import EmptyEnglishSource from "./EmptyEnglish.vue?raw";
import English from "./English.vue";
import EnglishSource from "./English.vue?raw";

export type { IBlog } from "./BlogList.vue";
// 导出主组件
export { default as BlogList } from "./BlogList.vue";

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
