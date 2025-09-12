
import ProductsBasicContainer from './ProductsBasicContainer.astro';
import ProductsGridContainer from './ProductsGridContainer.astro';
import ProductsListContainer from './ProductsListContainer.astro';
import ProductsCustomContainer from './ProductsCustomContainer.astro';
import ProductsWithBorderContainer from './ProductsWithBorderContainer.astro';
import ProductsWithMarginContainer from './ProductsWithMarginContainer.astro';
import ProductsSingleColumnContainer from './ProductsSingleColumnContainer.astro';
import ProductsCardSizeContainer from './ProductsCardSizeContainer.astro';
import ProductsCenterItemsContainer from './ProductsCenterItemsContainer.astro';
import ProductsColumnsContainer from './ProductsColumnsContainer.astro';
import ProductsCustomClassContainer from './ProductsCustomClassContainer.astro';
import ProductsDescriptionLinesContainer from './ProductsDescriptionLinesContainer.astro';
import ProductsEqualHeightContainer from './ProductsEqualHeightContainer.astro';
import ProductsGapContainer from './ProductsGapContainer.astro';
import ProductsLayoutContainer from './ProductsLayoutContainer.astro';
import ProductsMarginContainer from './ProductsMarginContainer.astro';
import ProductsProductsContainer from './ProductsProductsContainer.astro';
import ProductsShowBorderContainer from './ProductsShowBorderContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: ProductsBasicContainer,
        CardSize: ProductsCardSizeContainer,
        CenterItems: ProductsCenterItemsContainer,
        Columns: ProductsColumnsContainer,
        Custom: ProductsCustomContainer,
        CustomClass: ProductsCustomClassContainer,
        DescriptionLines: ProductsDescriptionLinesContainer,
        EqualHeight: ProductsEqualHeightContainer,
        Gap: ProductsGapContainer,
        Grid: ProductsGridContainer,
        Layout: ProductsLayoutContainer,
        List: ProductsListContainer,
        Margin: ProductsMarginContainer,
        Products: ProductsProductsContainer,
        ShowBorder: ProductsShowBorderContainer,
        WithBorder: ProductsWithBorderContainer,
        WithMargin: ProductsWithMarginContainer,
        SingleColumn: ProductsSingleColumnContainer,
    }
}; 
