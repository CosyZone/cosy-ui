import { extractSimpleExample } from "../../src/utils/component";
import NavSection from "./NavSection.astro";
import NavSectionBasic from "./NavSectionBasic.astro";
import BasicSourceCode from "./NavSectionBasic.astro?raw";

export { NavSection, NavSectionBasic };

// 导出示例源代码
export const NavSectionExampleCodes = {
	Basic: extractSimpleExample(BasicSourceCode, "NavSection"),
};
