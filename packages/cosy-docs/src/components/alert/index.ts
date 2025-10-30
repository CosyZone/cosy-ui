import AlertActionContainer from "./AlertActionContainer.astro";
import AlertBasicContainer from "./AlertBasicContainer.astro";
import AlertClosableContainer from "./AlertClosableContainer.astro";
import AlertCustomStyleContainer from "./AlertCustomStyleContainer.astro";
import AlertDashContainer from "./AlertDashContainer.astro";
import AlertMarginYContainer from "./AlertMarginYContainer.astro";
import AlertNoIconContainer from "./AlertNoIconContainer.astro";
import AlertOutlineContainer from "./AlertOutlineContainer.astro";
import AlertSoftContainer from "./AlertSoftContainer.astro";
import AlertTypesContainer from "./AlertTypesContainer.astro";
import AlertWithTitleContainer from "./AlertWithTitleContainer.astro";

export const AlertPackage = {
    Action: AlertActionContainer,
    Basic: AlertBasicContainer,
    Closable: AlertClosableContainer,
    CustomStyle: AlertCustomStyleContainer,
    Dash: AlertDashContainer,
    MarginY: AlertMarginYContainer,
    NoIcon: AlertNoIconContainer,
    Outline: AlertOutlineContainer,
    Soft: AlertSoftContainer,
    Types: AlertTypesContainer,
    WithTitle: AlertWithTitleContainer,
};
