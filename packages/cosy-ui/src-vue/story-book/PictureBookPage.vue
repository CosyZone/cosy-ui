<script setup lang="ts">
  /**
   * PictureBookPage
   *
   * 绘本页面容器：固定宽高比、按行等分、背景/覆盖插槽、可选横线网格。
   *
   * 用法（简要）：
   * - 基本：
   *   <PictureBookPage client:load lang="zh" :lines="35" :pageAspectRatio="3/4">
   *     <Image slot="background" :src="bgImage" alt="页面背景" />
   *     <PictureBookTextBox slot="overlay" :top="8" :left="50" :width="48" :heightInLines="8">正文</PictureBookTextBox>
   *   </PictureBookPage>
   * - 隐藏横线：<PictureBookPage :showLines="false">…</PictureBookPage>
   * - 自定义 aria：<PictureBookPage ariaLabelPrefix="绘本页（春日校园）">…</PictureBookPage>
   *
   * Props：
   * - lines：页面被分为的“行”数量，决定行高
   * - lang：强制语言 'zh'|'en'；不传按 URL 推断
   * - pageAspectRatio：页面宽高比（宽/高），如 3/4=0.75
   * - ariaLabelPrefix：无障碍 aria 标签前缀
   * - showLines：是否显示横线网格（排版辅助）
   *
   * Slots：
   * - background：背景层
   * - overlay：覆盖层（绝对定位）
   * - default：文字层
   *
   * Provide：
   * - pictureBookLineHeightPx：Ref<number> 每行像素高度，供子组件（如 PictureBookTextBox）使用
   */
  import {
    computed,
    onMounted,
    onBeforeUnmount,
    ref,
    watch,
    provide,
  } from 'vue';
  import type { PropType } from 'vue';

  // 运行时 props 定义
  const props = defineProps({
    /** 页面被分为的“行”数量（用于计算每行像素高度） */
    lines: { type: Number, default: 35 },
    /** 可选：强制指定语言（'zh' 或 'en'）。提供时可避免 SSR/CSR 判断不一致导致的水合警告。 */
    lang: {
      type: String as PropType<'zh' | 'en' | undefined>,
      default: undefined,
    },
    /** 可选：页面宽高比（宽/高）。未提供时容器按宽度自适应；常见绘本为 3/4 或 2/3。 */
    pageAspectRatio: { type: Number, default: 3 / 4 },
    /** 可选：无障碍 aria 标签前缀。不提供时将根据 URL 自动选择中英文。 */
    ariaLabelPrefix: { type: String, default: '' },
    /** 是否显示用于排版参考的横线网格 */
    showLines: { type: Boolean, default: true },
  });

  // 根据 props.lang 或 URL 自动判断语言（优先使用 props.lang，确保 SSR/CSR 一致）
  const isZh = computed(() => {
    if (props.lang === 'zh') return true;
    if (props.lang === 'en') return false;
    return (
      typeof window !== 'undefined' &&
      window.location?.pathname?.startsWith('/zh-cn')
    );
  });

  const containerRef = ref<HTMLElement | null>(null);
  const textRef = ref<HTMLElement | null>(null);
  const lineHeightPx = ref<number>(0);

  // 背景由具名插槽提供，不再在组件内解析图片 URL

  // 重新计算行高，使内容等分为指定的行数
  function recomputeLineHeight() {
    const container = containerRef.value;
    if (!container || !props.lines || props.lines <= 0) return;
    const height = container.clientHeight;
    const next = height / props.lines;
    // 防御极小值
    lineHeightPx.value = Number.isFinite(next) && next > 0 ? next : 0;
  }

  let resizeObserver: ResizeObserver | null = null;

  onMounted(() => {
    recomputeLineHeight();
    // 向子组件注入行高，便于子组件按 35 行对齐
    provide('pictureBookLineHeightPx', lineHeightPx);
    if (containerRef.value) {
      resizeObserver = new ResizeObserver(() => {
        recomputeLineHeight();
      });
      resizeObserver.observe(containerRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (resizeObserver && containerRef.value) {
      resizeObserver.unobserve(containerRef.value);
    }
    resizeObserver = null;
  });

  watch(
    () => props.lines,
    () => recomputeLineHeight()
  );

  const ariaLabel = computed(() => {
    if (props.ariaLabelPrefix) return props.ariaLabelPrefix;
    return isZh.value ? '绘本页' : 'Picture book page';
  });
</script>

<template>
  <section
    class="relative w-full overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5"
    :aria-label="ariaLabel">
    <!-- 固定页面宽高比，保持绘本页面比例 -->
    <div
      class="relative w-full"
      :style="{ paddingBottom: `${100 / (props.pageAspectRatio || 3 / 4)}%` }">
      <!-- 背景插槽层：由使用者提供背景节点（图片或其他元素） -->
      <div class="absolute inset-0">
        <slot name="background" />
      </div>

      <!-- 可选：柔和的纸张质感叠加，提升可读性 -->
      <div class="absolute inset-0 pointer-events-none bg-white/0"></div>

      <!-- 承载文字的容器，按 35 行等分对齐 -->
      <div ref="containerRef" class="absolute inset-0 flex">
        <div
          class="relative m-auto h-[95%] w-[88%]"
          :style="{ '--pb-line': lineHeightPx ? `${lineHeightPx}px` : undefined } as any">
          <!-- 叠加“横格线”视觉辅助（35 行） -->
          <div
            v-if="props.showLines"
            aria-hidden="true"
            class="pointer-events-none absolute inset-0 opacity-30"
            :style="{
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent calc(${lineHeightPx}px - 1px), rgba(0,0,0,0.15) calc(${lineHeightPx}px - 1px), rgba(0,0,0,0.15) ${lineHeightPx}px)`,
            }" />

          <!-- 任意位置文字/装饰的叠加层（由使用者提供），相对当前安全区域绝对定位 -->
          <div class="absolute inset-0">
            <slot name="overlay" />
          </div>

          <!-- 文字层 -->
          <div
            ref="textRef"
            class="relative h-full w-full whitespace-pre-wrap break-words text-gray-900"
            :style="{
              lineHeight: lineHeightPx ? `${lineHeightPx}px` : undefined,
              fontSize: isZh ? '18px' : '17px',
              fontWeight: '500',
            }">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  /* 在明亮的背景上增强文字可读性 */
  .text-shadow {
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
  }
</style>
