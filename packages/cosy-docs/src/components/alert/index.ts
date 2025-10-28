import AlertBasicContainer from "./AlertBasicContainer.astro";
import AlertWithTitleContainer from "./AlertWithTitleContainer.astro";
import AlertCustomStyleContainer from "./AlertCustomStyleContainer.astro";
import AlertTypesContainer from "./AlertTypesContainer.astro";
import AlertClosableContainer from "./AlertClosableContainer.astro";
import AlertActionContainer from "./AlertActionContainer.astro";
import AlertOutlineContainer from "./AlertOutlineContainer.astro";
import AlertDashContainer from "./AlertDashContainer.astro";
import AlertSoftContainer from "./AlertSoftContainer.astro";
import AlertNoIconContainer from "./AlertNoIconContainer.astro";
import AlertMarginYContainer from "./AlertMarginYContainer.astro";
import AlertFactory from "./AlertFactory.astro";

export const AlertPackage = {
	Action: AlertActionContainer,
	Basic: AlertBasicContainer,
	Closable: AlertClosableContainer,
	CustomStyle: AlertCustomStyleContainer,
	Dash: AlertDashContainer,
	Factory: AlertFactory,
	MarginY: AlertMarginYContainer,
	NoIcon: AlertNoIconContainer,
	Outline: AlertOutlineContainer,
	Soft: AlertSoftContainer,
	Types: AlertTypesContainer,
	WithTitle: AlertWithTitleContainer,
};
