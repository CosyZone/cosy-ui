import Basic from './Basic.astro';
import WithScrollBy from './WithScrollBy.astro';
import ExampleContainer from './containers/ExampleContainer.astro';
import ScrollByContainer from './containers/ScrollByContainer.astro';
import ShowNavigationContainer from './containers/ShowNavigationContainer.astro';
import GapContainer from './containers/GapContainer.astro';
import RoundedContainer from './containers/RoundedContainer.astro';
import BackgroundContainer from './containers/BackgroundContainer.astro';
import PaddingContainer from './containers/PaddingContainer.astro';
import MarginContainer from './containers/MarginContainer.astro';
import WidthContainer from './containers/WidthContainer.astro';
import HeightContainer from './containers/HeightContainer.astro';
import ClassContainer from './containers/ClassContainer.astro';
import ImagesExample from './ImagesExample.astro';
import ImagesContainer from './containers/ImagesContainer.astro';

export const ScrollRowPackage = {
    Basic,
    ImagesExample,
    WithScrollBy,
    Containers: {
        Example: ExampleContainer,
        Images: ImagesContainer,
        ScrollBy: ScrollByContainer,
        ShowNavigation: ShowNavigationContainer,
        Gap: GapContainer,
        Rounded: RoundedContainer,
        Background: BackgroundContainer,
        Padding: PaddingContainer,
        Margin: MarginContainer,
        Width: WidthContainer,
        Height: HeightContainer,
        Class: ClassContainer,
    },
};


