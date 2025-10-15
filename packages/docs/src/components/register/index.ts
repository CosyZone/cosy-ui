import RegisterBasic from "./RegisterBasic.astro";
import RegisterBasicContainer from "./RegisterBasicContainer.astro";
import RegisterCustomStyle from "./RegisterCustomStyle.astro";
import RegisterCustomStyleContainer from "./RegisterCustomStyleContainer.astro";

export const RegisterPackage = {
	RegisterContainers: {
		Basic: RegisterBasicContainer,
		CustomStyle: RegisterCustomStyleContainer,
	},
};
