import EAlertBasic from './EAlertBasic.astro.js';
import EAlertWithTitle from './EAlertWithTitle.astro.js';
import EAlertCustomStyle from './EAlertCustomStyle.astro.js';
import EAlertInfo from './EAlertInfo.astro.js';
import EAlertSuccess from './EAlertSuccess.astro.js';
import EAlertWarning from './EAlertWarning.astro.js';
import EAlertError from './EAlertError.astro.js';
import EAlertBasicContainer from './EAlertBasicContainer.astro.js';
import EAlertWithTitleContainer from './EAlertWithTitleContainer.astro.js';
import EAlertCustomStyleContainer from './EAlertCustomStyleContainer.astro.js';
import EAlertTypesContainer from './EAlertTypesContainer.astro.js';

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