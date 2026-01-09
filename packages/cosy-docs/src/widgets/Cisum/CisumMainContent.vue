<script setup lang="ts">
import {
  RiAlbumLine,
  RiDiscLine,
  RiHeartLine,
  RiHome2Line,
  RiMicLine,
  RiMusic2Line,
  RiPlayCircleLine,
  RiRadioLine,
  RiRobot2Line,
  RiSkipBackLine,
  RiSkipForwardLine,
  RiSunLine,
  RiTreeLine,
} from "@remixicon/vue";
import { computed } from "vue";

const props = defineProps<{
  deviceType: string;
  showPlayerView: boolean;
  showDBView: boolean;
  songIndex: number;
  lang: string;
}>();

import { ref } from 'vue';

const currentSongIndex = ref(props.songIndex);

const currentSong = computed(() => songs.value[currentSongIndex.value]);

// 上一曲
const previousSong = () => {
  currentSongIndex.value = currentSongIndex.value > 0
    ? currentSongIndex.value - 1
    : songs.value.length - 1;
};

// 下一曲
const nextSong = () => {
  currentSongIndex.value = currentSongIndex.value < songs.value.length - 1
    ? currentSongIndex.value + 1
    : 0;
};

const songs = computed(() =>
  props.lang === "zh-cn"
    ? [
      { name: "林俊杰-生生.mp3", size: "10.4MB", icon: RiHeartLine },
      { name: "林俊杰-不为谁而作的歌.wav", size: "46.9MB", icon: RiMusic2Line },
      { name: "光良-每一次喊你 (Live)-6.mp3", size: "4.8MB", icon: RiMicLine },
      { name: "光良-1901的上一位房客-6.mp3", size: "11.5MB", icon: RiHome2Line },
      { name: "周杰伦-她de睡颜.wav", size: "41.1MB", icon: RiAlbumLine },
      { name: "Groove Coverage - On The Radio.wav", size: "31.9MB", icon: RiRadioLine },
      { name: "伍佰-挪威的森林.wav", size: "69.1MB", icon: RiTreeLine },
      { name: "ai mini - 遇.wav", size: "65.8MB", icon: RiRobot2Line },
      { name: "孙燕姿-星期一天气晴我离开你.mp3", size: "10.5MB", icon: RiSunLine },
    ]
    : [
      { name: "Various Artists - The Way I Am.wav", size: "48.1MB", icon: RiHeartLine },
      { name: "Ed Sheeran - Shape of You.mp3", size: "9.2MB", icon: RiMusic2Line },
      { name: "Adele - Rolling in the Deep.wav", size: "25.3MB", icon: RiMicLine },
      { name: "Bruno Mars - Uptown Funk.mp3", size: "8.7MB", icon: RiDiscLine },
      { name: "Taylor Swift - Blank Space.wav", size: "30.1MB", icon: RiAlbumLine },
      { name: "Maroon 5 - Sugar.mp3", size: "7.8MB", icon: RiMusic2Line },
      { name: "The Weeknd - Blinding Lights.wav", size: "32.4MB", icon: RiRadioLine },
      { name: "Billie Eilish - Bad Guy.mp3", size: "9.1MB", icon: RiMicLine },
      { name: "Dua Lipa - Levitating.wav", size: "28.5MB", icon: RiDiscLine },
    ],
);
</script>

<template>
  <!-- 主要内容区域 -->
  <div class="flex-1 flex flex-col w-full h-full overflow-y-hidden" :class="[
    {
      // Mac
      'bg-linear-to-br from-primary/60 to-secondary/60': deviceType === 'mac',
      // iPhone
      'bg-transparent pt-16': deviceType === 'iphone',
    }
  ]">
    <!-- 播放器区域 -->
    <div v-if="showPlayerView" :class="{
      'flex-none pb-4 mt-8': true,
      'mx-8': deviceType === 'mac',
      'mx-auto': deviceType === 'iphone'
    }">
      <div class="font-medium mb-4 text-base-content text-center" :class="{
        'text-2xl': deviceType === 'mac',
        'text-xl': deviceType === 'iphone'
      }">
        {{ currentSong.name }}
      </div>
      <!-- 进度条 -->
      <div :class="{
        'flex items-center mt-12 mx-auto': true,
        'w-3/4 space-x-4': deviceType === 'mac',
        'w-full space-x-2 px-4': deviceType === 'iphone'
      }">
        <span class="text-sm text-base-content/70">00:00</span>
        <div class="flex-1 h-1 bg-base-content/30 rounded-full">
          <div class="w-1/4 h-full bg-base-content rounded-full" />
        </div>
        <span class="text-sm text-base-content/70">04:32</span>
      </div>
      <!-- 控制按钮 -->
      <div class="flex items-center justify-center mt-12" :class="{
        'space-x-8': deviceType === 'mac',
        'space-x-4': deviceType === 'iphone'
      }">
        <button @click="previousSong" class="text-2xl text-base-content hover:text-primary transition-colors">
          <RiSkipBackLine class="w-8 h-8" />
        </button>
        <button class="text-2xl text-base-content hover:text-primary transition-colors">
          <RiPlayCircleLine class="w-8 h-8" />
        </button>
        <button @click="nextSong" class="text-3xl text-base-content hover:text-primary transition-colors">
          <RiSkipForwardLine class="w-8 h-8" />
        </button>
      </div>
    </div>

    <!-- 歌曲列表 -->
    <div v-if="showDBView" class="flex-1 bg-base-100 h-1/2 pb-4 flex flex-col" :class="{
      'rounded-b-4xl': deviceType === 'iphone'
    }">
      <div class="text-xs text-base-content/70 bg-base-200 text-start pl-4 py-2">
        共 {{ songs.length }}
      </div>
      <!-- 歌曲列表 -->
      <div class="space-y-2 flex-1 overflow-y-auto" :class="{
        'rounded-b-4xl': deviceType === 'iphone'
      }">
        <div v-for="song in songs" :key="song.name" class="flex items-center p-3 hover:bg-base-200 transition-colors">
          <div class="w-12 h-12 rounded-lg bg-base-200 shrink-0 flex items-center justify-center">
            <component :is="song.icon" class="w-6 h-6 text-base-content/70" />
          </div>
          <div class="ml-3 flex-1 flex flex-col justify-start text-start">
            <div class="font-medium text-base-content">
              {{ song.name }}
            </div>
            <div class="text-sm text-base-content/70">
              {{ song.size }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
