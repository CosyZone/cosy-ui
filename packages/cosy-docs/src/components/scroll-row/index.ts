import Basic from './Basic.astro';
import WithScrollBy from './WithScrollBy.astro';
import ExampleContainer from './containers/ExampleContainer.astro';
import ScrollByContainer from './containers/ScrollByContainer.astro';
import ShowNavigationContainer from './containers/ShowNavigationContainer.astro';
import GapContainer from './containers/GapContainer.astro';
import RoundedContainer from './containers/RoundedContainer.astro';
import BackgroundContainer from './containers/BackgroundContainer.astro';

export const ScrollRowPackage = {
    Basic,
    WithScrollBy,
    Containers: {
        Example: ExampleContainer,
        ScrollBy: ScrollByContainer,
        ShowNavigation: ShowNavigationContainer,
        Gap: GapContainer,
        Rounded: RoundedContainer,
        Background: BackgroundContainer,
    },
};


