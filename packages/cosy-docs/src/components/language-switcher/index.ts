import LanguageSwitcherBasic from './LanguageSwitcherBasic.astro';
import LanguageSwitcherCustomList from './LanguageSwitcherCustomList.astro';
import LanguageSwitcherCustomStyle from './LanguageSwitcherCustomStyle.astro';

import LanguageSwitcherBasicContainer from './LanguageSwitcherBasicContainer.astro';
import LanguageSwitcherCustomListContainer from './LanguageSwitcherCustomListContainer.astro';
import LanguageSwitcherCustomStyleContainer from './LanguageSwitcherCustomStyleContainer.astro';

export const ComponentPackage = {
    ComponentContainers: {
        Basic: LanguageSwitcherBasicContainer,
        CustomList: LanguageSwitcherCustomListContainer,
        CustomStyle: LanguageSwitcherCustomStyleContainer,
    },
    Examples: {
        Basic: LanguageSwitcherBasic,
        CustomList: LanguageSwitcherCustomList,
        CustomStyle: LanguageSwitcherCustomStyle,
    },
}; 
