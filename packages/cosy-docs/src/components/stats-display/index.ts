import StatsDisplayAlignContainer from './StatsDisplayAlignContainer.astro';
import StatsDisplayCasesContainer from './StatsDisplayCasesContainer.astro';
import StatsDisplayColorfulContainer from './StatsDisplayColorfulContainer.astro';
import StatsDisplayColumnsContainer from './StatsDisplayColumnsContainer.astro';
import StatsDisplayCompactModeContainer from './StatsDisplayCompactModeContainer.astro';
import StatsDisplayCustomStyleContainer from './StatsDisplayCustomStyleContainer.astro';
import StatsDisplayExample from './StatsDisplayExample.astro';
import StatsDisplayGapContainer from './StatsDisplayGapContainer.astro';
import StatsDisplayLabelColorContainer from './StatsDisplayLabelColorContainer.astro';
import StatsDisplayLabelWeightContainer from './StatsDisplayLabelWeightContainer.astro';
import StatsDisplayLargeFontContainer from './StatsDisplayLargeFontContainer.astro';
import StatsDisplayPresetColorsContainer from './StatsDisplayPresetColorsContainer.astro';
import StatsDisplayStatsArrayContainer from './StatsDisplayStatsArrayContainer.astro';
import StatsDisplayValueColorContainer from './StatsDisplayValueColorContainer.astro';
import StatsDisplayValueSizeContainer from './StatsDisplayValueSizeContainer.astro';
import StatsDisplayValueWeightContainer from './StatsDisplayValueWeightContainer.astro';

export const StatsDisplayPackage = {
    // 案例
    Example: StatsDisplayExample,
    Cases: StatsDisplayCasesContainer,
    Colorful: StatsDisplayColorfulContainer,
    Compact: StatsDisplayCompactModeContainer,
    Alignment: StatsDisplayAlignContainer,
    LargeFont: StatsDisplayLargeFontContainer,
    PresetColors: StatsDisplayPresetColorsContainer,

    // Props 演示（按字母顺序）
    Align: StatsDisplayAlignContainer,
    Class: StatsDisplayCustomStyleContainer,
    Columns: StatsDisplayColumnsContainer,
    CompactMode: StatsDisplayCompactModeContainer,
    Gap: StatsDisplayGapContainer,
    LabelColor: StatsDisplayLabelColorContainer,
    LabelWeight: StatsDisplayLabelWeightContainer,
    StatsArray: StatsDisplayStatsArrayContainer,
    ValueColor: StatsDisplayValueColorContainer,
    ValueSize: StatsDisplayValueSizeContainer,
    ValueWeight: StatsDisplayValueWeightContainer,
};
