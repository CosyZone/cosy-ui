import Article from './Article.astro';
import ArticleBasic from './ArticleBasic.astro';
import BasicSourceCode from './ArticleBasic.astro?raw';
import { extractSimpleExample } from '../../src/utils/component';

export { Article, ArticleBasic };

// 导出示例源代码
export const ArticleExampleCodes = {
  Basic: extractSimpleExample(BasicSourceCode, 'Article'),
};
