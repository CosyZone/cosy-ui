import Button from './Button.astro';
import ButtonBasicContainer from './ButtonBasicContainer.astro';
import ButtonShapesContainer from './ButtonShapesContainer.astro';
import ButtonSizesContainer from './ButtonSizesContainer.astro';
import ButtonStatesContainer from './ButtonStatesContainer.astro';
import ButtonWithIconsContainer from './ButtonWithIconsContainer.astro';
import ButtonWidthContainer from './ButtonWidthContainer.astro';
import ButtonVariantsContainer from './ButtonVariantsContainer.astro';
import ButtonLinkContainer from './ButtonLinkContainer.astro';
import ButtonWide from './ButtonWide.astro';
import ButtonBlock from './ButtonBlock.astro';
import ButtonIconLeft from './ButtonIconLeft.astro';
import ButtonIconRight from './ButtonIconRight.astro';
import ButtonIconBoth from './ButtonIconBoth.astro';
import ButtonShapeCircle from './ButtonShapeCircle.astro';
import ButtonShapeSquare from './ButtonShapeSquare.astro';
import ButtonShapeDefault from './ButtonShapeDefault.astro';
import ButtonInfo from './ButtonInfo.astro';
import ButtonSuccess from './ButtonSuccess.astro';
import ButtonWarning from './ButtonWarning.astro';
import ButtonError from './ButtonError.astro';
import ButtonGhost from './ButtonGhost.astro';
import ButtonLink from './ButtonLink.astro';
import ButtonLinkExternal from './ButtonLinkExternal.astro';
import ButtonOutline from './ButtonOutline.astro';
import ButtonNeutral from './ButtonNeutral.astro';

export {
	Button
};

export const ButtonPackage = {
	Button,
	ButtonWide,
	ButtonBlock,
	ButtonIconLeft,
	ButtonIconRight,
	ButtonIconBoth,
	ButtonShapeCircle,
	ButtonShapeSquare,
	ButtonShapeDefault,
	ButtonInfo,
	ButtonSuccess,
	ButtonWarning,
	ButtonError,
	ButtonGhost,
	ButtonLink,
	ButtonLinkExternal,
	ButtonOutline,
	ButtonNeutral,

	ButtonContainers: {
		Basic: ButtonBasicContainer,
		Shapes: ButtonShapesContainer,
		Sizes: ButtonSizesContainer,
		States: ButtonStatesContainer,
		WithIcons: ButtonWithIconsContainer,
		Width: ButtonWidthContainer,
		Variants: ButtonVariantsContainer,
		Link: ButtonLinkContainer
	}
};