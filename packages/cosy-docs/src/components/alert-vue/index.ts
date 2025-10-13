import AlertVueBasicContainer from "./AlertVueBasicContainer.astro";
import AlertVueTypesContainer from "./AlertVueTypesContainer.astro";
import AlertVueCustomStyleContainer from "./AlertVueCustomStyleContainer.astro";
import AlertVueWithTitleContainer from "./AlertVueWithTitleContainer.astro";
import AlertVueClosableContainer from "./AlertVueClosableContainer.astro";
import AlertVueActionContainer from "./AlertVueActionContainer.astro";
import AlertVueMarginYContainer from "./AlertVueMarginYContainer.astro";
import AlertVueNoIconContainer from "./AlertVueNoIconContainer.astro";
import AlertVueOutlineContainer from "./AlertVueOutlineContainer.astro";
import AlertVueDashContainer from "./AlertVueDashContainer.astro";
import AlertVueSoftContainer from "./AlertVueSoftContainer.astro";

export const AlertVuePackage = {
	Action: AlertVueActionContainer,
	Basic: AlertVueBasicContainer,
	Closable: AlertVueClosableContainer,
	CustomStyle: AlertVueCustomStyleContainer,
	Dash: AlertVueDashContainer,
	MarginY: AlertVueMarginYContainer,
	NoIcon: AlertVueNoIconContainer,
	Outline: AlertVueOutlineContainer,
	Soft: AlertVueSoftContainer,
	Types: AlertVueTypesContainer,
	WithTitle: AlertVueWithTitleContainer,
};
