import Basic from "./Basic.vue";
import Empty from "./Empty.vue";
import English from "./English.vue";
import EmptyEnglish from "./EmptyEnglish.vue";
import BasicSource from "./Basic.vue?raw";
import EmptySource from "./Empty.vue?raw";
import EnglishSource from "./English.vue?raw";
import EmptyEnglishSource from "./EmptyEnglish.vue?raw";
import { extractSimpleExample } from "../../src/utils/component";

// 导出主组件
export { default as BlogList } from "./BlogList.vue";
export type { IBlog } from "./BlogList.vue";

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
