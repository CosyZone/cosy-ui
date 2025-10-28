/**
 * 应用布局组件
 */

import AppLayout from "./AppLayout.astro";
import AppHeader from "./AppHeader.astro";

export { AppLayout, AppHeader };
export type { IAppLayoutAllProps } from "./AppLayout.astro";

// Props Builder（内部工具）
export {
	AppLayoutPropsBuilder,
	appLayoutProps,
} from "../../src/components/layout-app/AppLayoutPropsBuilder";
