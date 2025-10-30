import RegisterBasicContainer from "./RegisterBasicContainer.astro";
import RegisterCustomStyleContainer from "./RegisterCustomStyleContainer.astro";

export const RegisterPackage = {
	RegisterContainers: {
		Basic: RegisterBasicContainer,
		CustomStyle: RegisterCustomStyleContainer,
	},
};
