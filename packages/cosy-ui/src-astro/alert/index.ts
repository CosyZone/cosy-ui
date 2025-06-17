import Alert from './Alert.astro';
import AlertBasicContainer from './EAlertBasicContainer.astro';
import AlertWithTitleContainer from './EAlertWithTitleContainer.astro';
import AlertTypesContainer from './EAlertTypesContainer.astro';
import AlertCustomStyleContainer from './EAlertCustomStyleContainer.astro';

export { Alert };
export const AlertPackage = {
  Alert,
  AlertContainers: {
    Basic: AlertBasicContainer,
    WithTitle: AlertWithTitleContainer,
    Types: AlertTypesContainer,
    CustomStyle: AlertCustomStyleContainer,
  },
};
