import AlertBasicContainer from './AlertBasicContainer.astro';
import AlertWithTitleContainer from './AlertWithTitleContainer.astro';
import AlertCustomStyleContainer from './AlertCustomStyleContainer.astro';
import AlertTypesContainer from './AlertTypesContainer.astro';
import AlertVueContainer from './AlertVueContainer.astro';
import AlertClosableContainer from './AlertClosableContainer.astro';
import AlertActionContainer from './AlertActionContainer.astro';
import AlertOutlineContainer from './AlertOutlineContainer.astro';
import AlertDashContainer from './AlertDashContainer.astro';
import AlertSoftContainer from './AlertSoftContainer.astro';
import AlertNoIconContainer from './AlertNoIconContainer.astro';

export const AlertPackage = {
    AlertContainers: {
        Basic: AlertBasicContainer,
        WithTitle: AlertWithTitleContainer,
        Types: AlertTypesContainer,
        CustomStyle: AlertCustomStyleContainer,
        Vue: AlertVueContainer,
        Closable: AlertClosableContainer,
        Action: AlertActionContainer,
        Outline: AlertOutlineContainer,
        Dash: AlertDashContainer,
        Soft: AlertSoftContainer,
        NoIcon: AlertNoIconContainer,
    }
}; 
