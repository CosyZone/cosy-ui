import Stack from "./Stack.astro";
import StackBasic from "./StackBasic.astro";
import BasicSourceCode from "./StackBasic.astro?raw";
import { extractSimpleExample } from "../../utils/component";

export { Stack, StackBasic };

// 导出示例源代码
export const StackExampleCodes = {
    Basic: extractSimpleExample(BasicSourceCode, "Stack"),
};
