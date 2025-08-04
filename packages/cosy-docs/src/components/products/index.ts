
import ProductsBasicContainer from './ProductsBasicContainer.astro';
import ProductsGridContainer from './ProductsGridContainer.astro';
import ProductsListContainer from './ProductsListContainer.astro';
import ProductsCustomContainer from './ProductsCustomContainer.astro';
import ProductsWithBorderContainer from './ProductsWithBorderContainer.astro';
import ProductsWithMarginContainer from './ProductsWithMarginContainer.astro';
import ProductsSingleColumnContainer from './ProductsSingleColumnContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: ProductsBasicContainer,
        Grid: ProductsGridContainer,
        List: ProductsListContainer,
        Custom: ProductsCustomContainer,
        WithBorder: ProductsWithBorderContainer,
        WithMargin: ProductsWithMarginContainer,
        SingleColumn: ProductsSingleColumnContainer,
    }
}; 
