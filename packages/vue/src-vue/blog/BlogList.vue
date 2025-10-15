<!--
@component BlogList

@description
BlogList 组件用于展示博客文章列表，支持国际化，提供空状态显示。

@usage
基本用法：
```vue
<BlogList :blogs="blogPosts" lang="zh" />
```

多语言支持：
```vue
<BlogList :blogs="blogPosts" lang="en" />
```

组合使用：
```vue
<template>
  <BlogList :blogs="blogPosts" :lang="currentLang" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BlogList } from "cosy-ui";

const blogPosts = ref([
	{ id: "1", title: "文章标题", link: "/blog/post-1", tags: ["技术", "Vue"] },
]);
const currentLang = ref("zh");
</script>
```

@props
@prop {IBlog[]} blogs - 博客文章数组
@prop {('zh'|'en')} [lang='zh'] - 语言设置，影响空状态显示文本
-->

<script setup lang="ts">
import '../../style';
import InboxArchiveIcon from '../icons/InboxArchiveIcon.vue';
import Link from '../SmartLink.vue';
import ListItem from '../list/ListItem.vue';

export interface IBlog {
  id: string;
  title: string;
  link: string;
  tags: string[];
}

interface Props {
  blogs: IBlog[];
  lang?: 'zh' | 'en';
}

const props = withDefaults(defineProps<Props>(), {
  lang: 'zh',
});

// 多语言文本
const messages = {
  zh: {
    empty: '暂无博客文章',
    checkLater: '稍后再来看看吧',
  },
  en: {
    empty: 'No blog posts yet',
    checkLater: 'Check back later',
  },
};

const t = (key: keyof (typeof messages)['zh']) => {
  return messages[props.lang][key];
};
</script>

<template>
  <div class="cosy:py-4">
    <ul v-if="blogs.length > 0" class="cosy:list-none">
      <ListItem v-for="blog in blogs" :key="blog.id">
        <Link :href="blog.link">
          {{ blog.title }}
        </Link>
      </ListItem>
    </ul>
    <div v-else class="cosy:text-center cosy:py-8">
      <div
        class="cosy:flex cosy:flex-col cosy:items-center cosy:text-base-content/50"
      >
        <InboxArchiveIcon class="cosy:text-5xl cosy:mb-4 cosy:h-36 cosy:w-36" />
        <p class="cosy:text-lg">
          {{ t('empty') }}
        </p>
        <p class="cosy:text-sm">
          {{ t('checkLater') }}
        </p>
      </div>
    </div>
  </div>
</template>
