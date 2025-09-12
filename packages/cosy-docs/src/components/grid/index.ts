import GridBasic from './GridBasic.astro';
import GridBasicContainer from './GridBasicContainer.astro';
import GridBorderContainer from './GridBorderContainer.astro';
import GridColGapContainer from './GridColGapContainer.astro';
import GridColsContainer from './GridColsContainer.astro';
import GridCustomStyleContainer from './GridCustomStyleContainer.astro';
import GridGapContainer from './GridGapContainer.astro';
import GridMarginYContainer from './GridMarginYContainer.astro';
import GridRowGapContainer from './GridRowGapContainer.astro';

export const GridPackage = {
    GridExamples: {
        Basic: GridBasic,
    },
    GridContainers: {
        Border: GridBorderContainer,
        ColGap: GridColGapContainer,
        Cols: GridColsContainer,
        CustomStyle: GridCustomStyleContainer,
        Gap: GridGapContainer,
        MarginY: GridMarginYContainer,
        RowGap: GridRowGapContainer,
    },
}; 
