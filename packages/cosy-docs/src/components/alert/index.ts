import AlertBasic from './AlertBasic.astro';
import AlertWithTitle from './AlertWithTitle.astro';
import AlertCustomStyle from './AlertCustomStyle.astro';
import AlertInfo from './AlertInfo.astro';
import AlertSuccess from './AlertSuccess.astro';
import AlertWarning from './AlertWarning.astro';
import AlertError from './AlertError.astro';
import AlertBasicContainer from './AlertBasicContainer.astro';
import AlertWithTitleContainer from './AlertWithTitleContainer.astro';
import AlertCustomStyleContainer from './AlertCustomStyleContainer.astro';
import AlertTypesContainer from './AlertTypesContainer.astro';
import AlertVueContainer from './AlertVueContainer.astro';
import AlertClosableContainer from './AlertClosableContainer.astro';
import AlertActionContainer from './AlertActionContainer.astro';

export const AlertPackage = {
    AlertContainers: {
        Basic: AlertBasicContainer,
        WithTitle: AlertWithTitleContainer,
        Types: AlertTypesContainer,
        CustomStyle: AlertCustomStyleContainer,
        Vue: AlertVueContainer,
        Closable: AlertClosableContainer,
        Action: AlertActionContainer,
    },
    AlertExamples: {
        Basic: AlertBasic,
        WithTitle: AlertWithTitle,
        CustomStyle: AlertCustomStyle,
        Info: AlertInfo,
        Success: AlertSuccess,
        Warning: AlertWarning,
        Error: AlertError,
    },
}; 
