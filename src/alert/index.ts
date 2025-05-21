import Alert from './Alert.astro';
import AlertBasicContainer from './AlertBasicContainer.astro';
import AlertWithTitleContainer from './AlertWithTitleContainer.astro';
import AlertTypesContainer from './AlertTypesContainer.astro';
import AlertCustomStyleContainer from './AlertCustomStyleContainer.astro';

export { Alert }
export const AlertPackage = {
	Alert,
	AlertContainers: {
		Basic: AlertBasicContainer,
		WithTitle: AlertWithTitleContainer,
		Types: AlertTypesContainer,
		CustomStyle: AlertCustomStyleContainer,

	},
}