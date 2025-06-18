import Container from './Container.astro';
import ContainerBasicContainer from './EContainerBasicContainer.astro';
import ContainerSizesContainer from './EContainerSizesContainer.astro';
import ContainerPaddingContainer from './EContainerPaddingContainer.astro';
import ContainerFlexContainer from './EContainerFlexContainer.astro';

export { default as Container } from './Container.astro';
export const ContainerPackage = {
  Container,
  ContainerContainers: {
    Basic: ContainerBasicContainer,
    Sizes: ContainerSizesContainer,
    Padding: ContainerPaddingContainer,
    Flex: ContainerFlexContainer,
  },
};
