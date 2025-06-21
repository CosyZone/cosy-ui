// Header 示例组件
import HeaderBasic from './HeaderBasic.astro';
import HeaderCustomNavbarCenter from './HeaderCustomNavbarCenter.astro';
import HeaderCustomNavbarEnd from './HeaderCustomNavbarEnd.astro';
import HeaderCustomNavbarStart from './HeaderCustomNavbarStart.astro';
import HeaderCustomPosition from './HeaderCustomPosition.astro';
import HeaderWithNavigation from './HeaderWithNavigation.astro';

// Header 容器组件
import HeaderBasicContainer from './HeaderBasicContainer.astro';
import HeaderCustomNavbarCenterContainer from './HeaderCustomNavbarCenterContainer.astro';
import HeaderCustomNavbarEndContainer from './HeaderCustomNavbarEndContainer.astro';
import HeaderCustomNavbarStartContainer from './HeaderCustomNavbarStartContainer.astro';
import HeaderWithNavigationContainer from './HeaderWithNavigationContainer.astro';

// Header 示例代码
import HeaderBasicSourceCode from './HeaderBasic.astro?raw';
import HeaderWithNavigationSourceCode from './HeaderWithNavigation.astro?raw';
import HeaderCustomNavbarStartSourceCode from './HeaderCustomNavbarStart.astro?raw';
import HeaderCustomNavbarCenterSourceCode from './HeaderCustomNavbarCenter.astro?raw';
import HeaderCustomNavbarEndSourceCode from './HeaderCustomNavbarEnd.astro?raw';

// 提取简单示例的工具函数
function extractSimpleExample(sourceCode: string, componentName: string): string {
    const lines = sourceCode.split('\n');
    const startIndex = lines.findIndex(line => line.includes('<' + componentName));
    const endIndex = lines.findIndex((line, index) =>
        index > startIndex && line.includes('</' + componentName + '>'));

    if (startIndex === -1) {
        // 如果没有找到闭合标签，寻找自闭合标签
        const selfClosingIndex = lines.findIndex(line =>
            line.includes('<' + componentName) && line.includes('/>'));
        if (selfClosingIndex !== -1) {
            return lines.slice(selfClosingIndex, selfClosingIndex + 1).join('\n');
        }
        return sourceCode;
    }

    return lines.slice(startIndex, endIndex + 1).join('\n');
}

export const HeaderExampleCodes = {
    Basic: extractSimpleExample(HeaderBasicSourceCode, 'Header'),
    WithNavigation: extractSimpleExample(HeaderWithNavigationSourceCode, 'Header'),
    CustomNavbarStart: extractSimpleExample(HeaderCustomNavbarStartSourceCode, 'Header'),
    CustomNavbarCenter: extractSimpleExample(HeaderCustomNavbarCenterSourceCode, 'Header'),
    CustomNavbarEnd: extractSimpleExample(HeaderCustomNavbarEndSourceCode, 'Header'),
};

export const HeaderPackage = {
    HeaderContainers: {
        Basic: HeaderBasicContainer,
        CustomNavbarCenter: HeaderCustomNavbarCenterContainer,
        CustomNavbarEnd: HeaderCustomNavbarEndContainer,
        CustomNavbarStart: HeaderCustomNavbarStartContainer,
        WithNavigation: HeaderWithNavigationContainer,
    },
    HeaderExamples: {
        Basic: HeaderBasic,
        CustomNavbarCenter: HeaderCustomNavbarCenter,
        CustomNavbarEnd: HeaderCustomNavbarEnd,
        CustomNavbarStart: HeaderCustomNavbarStart,
        CustomPosition: HeaderCustomPosition,
        WithNavigation: HeaderWithNavigation,
    },
    HeaderExampleCodes,
}; 