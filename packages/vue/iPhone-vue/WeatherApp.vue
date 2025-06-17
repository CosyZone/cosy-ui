<!--
@component iPhoneWindow.WeatherApp

@description
天气应用示例，展示一个更复杂的 iPhone 应用界面，包含标题栏、主内容区和底部导航。

@usage
```vue
<iPhoneWindowExamples.WeatherApp />
```
-->

<script lang="ts">
import '../../app.css';
import { defineComponent } from 'vue';
import iPhoneWindow from './iPhoneWindow.vue';

export default defineComponent({
  name: 'iPhoneWindowWeatherAppExample',
  components: {
    iPhoneWindow,
  },
});
</script>

<template>
  <iPhoneWindow>
    <div class="cosy:flex cosy:flex-col cosy:h-full">
      <!-- 应用标题栏 -->
      <div
        class="cosy:bg-primary cosy:text-white cosy:px-4 cosy:py-3 cosy:flex cosy:items-center cosy:justify-between"
      >
        <h2 class="cosy:font-medium">天气预报</h2>
        <button class="cosy:btn cosy:btn-ghost cosy:btn-sm cosy:p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="cosy:h-5 cosy:w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <!-- 主要内容 -->
      <div
        class="cosy:flex-1 cosy:p-4 cosy:bg-gradient-to-b cosy:from-blue-400 cosy:to-blue-600"
      >
        <div class="cosy:text-center cosy:text-white">
          <div class="cosy:text-5xl cosy:font-light cosy:mb-2">23°</div>
          <div class="cosy:text-xl cosy:mb-4">晴朗</div>
          <div class="cosy:text-sm cosy:opacity-90">上海市，今天</div>
        </div>

        <div
          class="cosy:mt-8 cosy:bg-white/20 cosy:backdrop-blur-sm cosy:rounded-xl cosy:p-4"
        >
          <div
            class="cosy:grid cosy:grid-cols-3 cosy:gap-4 cosy:text-center cosy:text-white"
          >
            <div>
              <div class="cosy:text-sm cosy:opacity-80">湿度</div>
              <div class="cosy:font-medium">68%</div>
            </div>
            <div>
              <div class="cosy:text-sm cosy:opacity-80">风速</div>
              <div class="cosy:font-medium">8 km/h</div>
            </div>
            <div>
              <div class="cosy:text-sm cosy:opacity-80">能见度</div>
              <div class="cosy:font-medium">10 km</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航 -->
      <div
        class="cosy:bg-white cosy:border-t cosy:border-gray-200 cosy:flex cosy:justify-around cosy:py-2"
      >
        <button class="cosy:p-2 cosy:text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="cosy:h-6 cosy:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <button class="cosy:p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="cosy:h-6 cosy:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button class="cosy:p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="cosy:h-6 cosy:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </iPhoneWindow>
</template>
