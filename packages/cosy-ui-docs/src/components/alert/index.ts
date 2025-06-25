import EAlertBasic from './EAlertBasic.astro';
import EAlertWithTitle from './EAlertWithTitle.astro';
import EAlertCustomStyle from './EAlertCustomStyle.astro';
import EAlertInfo from './EAlertInfo.astro';
import EAlertSuccess from './EAlertSuccess.astro';
import EAlertWarning from './EAlertWarning.astro';
import EAlertError from './EAlertError.astro';
import EAlertBasicContainer from './EAlertBasicContainer.astro';
import EAlertWithTitleContainer from './EAlertWithTitleContainer.astro';
import EAlertCustomStyleContainer from './EAlertCustomStyleContainer.astro';
import EAlertTypesContainer from './EAlertTypesContainer.astro';

export const AlertPackage = {
    AlertContainers: {
        Basic: EAlertBasicContainer,
        WithTitle: EAlertWithTitleContainer,
        Types: EAlertTypesContainer,
        CustomStyle: EAlertCustomStyleContainer,
    },
    AlertExamples: {
        Basic: EAlertBasic,
        WithTitle: EAlertWithTitle,
        CustomStyle: EAlertCustomStyle,
        Info: EAlertInfo,
        Success: EAlertSuccess,
        Warning: EAlertWarning,
        Error: EAlertError,
    },
}; 
