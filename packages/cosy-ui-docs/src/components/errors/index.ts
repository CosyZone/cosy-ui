// Error 示例组件
import E403Basic from './E403Basic.astro.js';
import E404Basic from './E404Basic.astro.js';
import E500Basic from './E500Basic.astro.js';
import E503Maintenance from './E503Maintenance.astro.js';
import EErrorPageShowcase from './EErrorPageShowcase.astro.js';
import EErrorPageCustomStyle from './EErrorPageCustomStyle.astro.js';
import E404WithDebug from './E404WithDebug.astro.js';

// Error 容器组件
import E403BasicContainer from './E403BasicContainer.astro.js';
import E404BasicContainer from './E404BasicContainer.astro.js';
import E500BasicContainer from './E500BasicContainer.astro.js';
import E503MaintenanceContainer from './E503MaintenanceContainer.astro.js';
import EErrorPageShowcaseContainer from './EErrorPageShowcaseContainer.astro.js';
import EErrorPageCustomStyleContainer from './EErrorPageCustomStyleContainer.astro.js';

export const ErrorPackage = {
    ErrorContainers: {
        Basic403: E403BasicContainer,
        Basic404: E404BasicContainer,
        Basic500: E500BasicContainer,
        Maintenance503: E503MaintenanceContainer,
        Showcase: EErrorPageShowcaseContainer,
        CustomStyle: EErrorPageCustomStyleContainer,
    },
    ErrorExamples: {
        Basic403: E403Basic,
        Basic404: E404Basic,
        Basic500: E500Basic,
        Maintenance503: E503Maintenance,
        Showcase: EErrorPageShowcase,
        CustomStyle: EErrorPageCustomStyle,
        WithDebug404: E404WithDebug,
    },
}; 