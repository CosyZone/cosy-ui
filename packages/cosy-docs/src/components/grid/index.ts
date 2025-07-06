import BasicContainer from './BasicContainer.astro';
import ResponsiveContainer from './ResponsiveContainer.astro';
import CustomGapContainer from './CustomGapContainer.astro';

export const GridPackage = {
    GridContainers: {
        Basic: BasicContainer,
        Responsive: ResponsiveContainer,
        CustomGap: CustomGapContainer,
    },
}; 