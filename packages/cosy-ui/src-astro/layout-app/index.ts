/**
 * 应用布局组件
 */

import AppHeader from "./AppHeader.astro";
import AppLayout from "./AppLayout.astro";

export { AppLayout, AppHeader };

// Props Builder（内部工具）
export {
	AppLayoutPropsBuilder,
	appLayoutProps,
} from "../../src/components/layout-app/AppLayoutPropsBuilder";
export type { IAppLayoutAllProps } from "./AppLayout.astro";
