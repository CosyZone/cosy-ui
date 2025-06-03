import Basic from './Basic.vue';
import WithTabs from './WithTabs.vue';
import WithEvents from './WithEvents.vue';
import WithToolbar from './WithToolbar.vue';
import WithSidebar from './WithSidebar.vue';
import CustomHeight from './CustomHeight.vue';
import BasicSource from './Basic.vue?raw';
import WithTabsSource from './WithTabs.vue?raw';
import WithEventsSource from './WithEvents.vue?raw';
import WithToolbarSource from './WithToolbar.vue?raw';
import WithSidebarSource from './WithSidebar.vue?raw';
import CustomHeightSource from './CustomHeight.vue?raw';
import { extractSimpleExample } from '../../utils/component';

// 导出主组件
export { default as MacWindow } from './MacWindow.vue';

// 将示例组件整合为一个对象导出
export const MacWindowExamples = {
	Basic,
	WithTabs,
	WithEvents,
	WithToolbar,
	WithSidebar,
	CustomHeight,
};

// 导出示例组件的源代码（简化版本）
export const MacWindowExampleCodes = {
	Basic: extractSimpleExample(BasicSource, 'MacWindow'),
	WithTabs: extractSimpleExample(WithTabsSource, 'MacWindow'),
	WithEvents: extractSimpleExample(WithEventsSource, 'MacWindow'),
	WithToolbar: extractSimpleExample(WithToolbarSource, 'MacWindow'),
	WithSidebar: extractSimpleExample(WithSidebarSource, 'MacWindow'),
	CustomHeight: extractSimpleExample(CustomHeightSource, 'MacWindow'),
};
