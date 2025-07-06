import ProductsBasic from './ProductsBasic.astro';
import ProductsGrid from './ProductsGrid.astro';
import ProductsList from './ProductsList.astro';
import ProductsCustom from './ProductsCustom.astro';

import ProductsBasicContainer from './ProductsBasicContainer.astro';
import ProductsGridContainer from './ProductsGridContainer.astro';
import ProductsListContainer from './ProductsListContainer.astro';
import ProductsCustomContainer from './ProductsCustomContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: ProductsBasicContainer,
        Grid: ProductsGridContainer,
        List: ProductsListContainer,
        Custom: ProductsCustomContainer,
    },
    Examples: {
        Basic: ProductsBasic,
        Grid: ProductsGrid,
        List: ProductsList,
        Custom: ProductsCustom,
    },
}; 