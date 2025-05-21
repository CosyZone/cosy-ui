import Button from './Button.astro';
import ButtonBasicContainer from './ButtonBasicContainer.astro';
import ButtonShapesContainer from './ButtonShapesContainer.astro';
import ButtonSizesContainer from './ButtonSizesContainer.astro';
import ButtonStatesContainer from './ButtonStatesContainer.astro';
import ButtonWithIconsContainer from './ButtonWithIconsContainer.astro';
import ButtonWidthContainer from './ButtonWidthContainer.astro';
import ButtonWidth from './ButtonWidth.astro';

export {
	Button
};

export const ButtonPackage = {
	Button,
	ButtonWidth,

	ButtonContainers: {
		Basic: ButtonBasicContainer,
		Shapes: ButtonShapesContainer,
		Sizes: ButtonSizesContainer,
		States: ButtonStatesContainer,
		WithIcons: ButtonWithIconsContainer,
		Width: ButtonWidthContainer
	}
};