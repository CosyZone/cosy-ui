import BasicContainer from './BasicContainer.astro';
import ResponsiveContainer from './ResponsiveContainer.astro';
import CustomGapContainer from './CustomGapContainer.astro';
import MarginYContainer from './MarginYContainer.astro';
import BorderContainer from './BorderContainer.astro';

export const GridPackage = {
    GridContainers: {
        Basic: BasicContainer,
        Responsive: ResponsiveContainer,
        CustomGap: CustomGapContainer,
        MarginY: MarginYContainer,
        Border: BorderContainer,
    },
}; 
