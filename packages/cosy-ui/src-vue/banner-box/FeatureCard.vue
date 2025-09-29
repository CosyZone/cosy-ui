<script setup lang="ts">
import { computed, type Component } from "vue";
import {
	// 开发相关
	RiGithubFill,
	RiGitBranchLine,
	RiTerminalBoxLine,
	RiCommandLine,
	RiCodeSSlashLine,
	RiBracesLine,
	RiDatabase2Line,
	RiServerLine,
	// 文档相关
	RiBookOpenLine,
	RiFileTextLine,
	RiArticleLine,
	RiDraftLine,
	RiFileListLine,
	// 媒体相关
	RiImage2Line,
	RiVideoLine,
	RiMusic2Line,
	RiPlayCircleLine,
	RiMovieLine,
	// 社交相关
	RiUserLine,
	RiTeamLine,
	RiChat1Line,
	RiMessage2Line,
	RiShareLine,
	// 工具相关
	RiToolsLine,
	RiSettings4Line,
	RiDashboardLine,
	RiAppsLine,
	RiPlugLine,
	// 安全相关
	RiShieldLine,
	RiLockLine,
	RiKeyLine,
	RiUserSettingsLine,
	// 云服务相关
	RiCloudLine,
	RiUploadCloud2Line,
	RiDownloadCloud2Line,
	RiCloudOffLine,
	// 设备相关
	RiSmartphoneLine,
	RiTabletLine,
	RiComputerLine,
	RiWifiLine,
	// 数据相关
	RiPieChartLine,
	RiLineChartLine,
	RiBarChartLine,
	// AI/机器学习相关
	RiRobot2Line,
	RiBrainLine,
	RiCpuLine,
	// 其他常用
	RiRocketLine,
	RiLightbulbLine,
	RiStarLine,
	RiHeartLine,
	RiThumbUpLine,
} from "@remixicon/vue";

// 预设图标映射
const presetIcons = {
	// 开发类
	github: RiGithubFill,
	git: RiGitBranchLine,
	terminal: RiTerminalBoxLine,
	command: RiCommandLine,
	code: RiCodeSSlashLine,
	api: RiBracesLine,
	database: RiDatabase2Line,
	server: RiServerLine,

	// 文档类
	book: RiBookOpenLine,
	file: RiFileTextLine,
	article: RiArticleLine,
	draft: RiDraftLine,
	list: RiFileListLine,

	// 媒体类
	image: RiImage2Line,
	video: RiVideoLine,
	music: RiMusic2Line,
	play: RiPlayCircleLine,
	movie: RiMovieLine,

	// 社交类
	user: RiUserLine,
	team: RiTeamLine,
	chat: RiChat1Line,
	message: RiMessage2Line,
	share: RiShareLine,

	// 工具类
	tools: RiToolsLine,
	settings: RiSettings4Line,
	dashboard: RiDashboardLine,
	apps: RiAppsLine,
	plugin: RiPlugLine,

	// 安全类
	shield: RiShieldLine,
	lock: RiLockLine,
	key: RiKeyLine,
	security: RiUserSettingsLine,

	// 云服务类
	cloud: RiCloudLine,
	upload: RiUploadCloud2Line,
	download: RiDownloadCloud2Line,
	offline: RiCloudOffLine,

	// 设备类
	mobile: RiSmartphoneLine,
	tablet: RiTabletLine,
	computer: RiComputerLine,
	wifi: RiWifiLine,

	// 数据类
	chart: RiPieChartLine,
	line: RiLineChartLine,
	bar: RiBarChartLine,
	data: RiDatabase2Line,

	// AI/机器学习类
	robot: RiRobot2Line,
	brain: RiBrainLine,
	cpu: RiCpuLine,

	// 其他常用
	rocket: RiRocketLine,
	idea: RiLightbulbLine,
	star: RiStarLine,
	heart: RiHeartLine,
	like: RiThumbUpLine,
} as const;

type PresetIconType = keyof typeof presetIcons;

interface Props {
	title: string;
	description?: string;
	link?: string;
	emoji?: string;
	icon?: Component; // 自定义图标组件
	presetIcon?: PresetIconType; // 预设图标名称
}

const props = defineProps<Props>();

// 获取预设图标组件
const getPresetIcon = computed(() => {
	if (!props.presetIcon) return null;
	return presetIcons[props.presetIcon];
});
</script>

<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link || undefined"
    :target="link ? '_blank' : undefined"
    :rel="link ? 'noopener noreferrer' : undefined"
    :class="[
      'cosy:card cosy:no-underline cosy:bg-base-100/10 cosy:backdrop-blur-lg cosy:p-8 cosy:transition-all cosy:duration-300 cosy:hover:-translate-y-1 cosy:shadow-lg',
      {
        'cosy:hover:bg-primary/15 cosy:cursor-pointer': link,
        'cosy:cursor-default': !link,
      },
    ]"
  >
    <div class="card-body cosy:p-0">
      <div class="cosy:mb-4">
        <component
          :is="icon"
          v-if="icon"
          class="cosy:text-4xl cosy:text-base-content"
        />
        <component
          :is="getPresetIcon"
          v-else-if="presetIcon"
          class="cosy:text-4xl cosy:text-base-content"
        />
        <div v-else class="cosy:text-4xl cosy:text-base-content">
          {{ emoji }}
        </div>
      </div>
      <h3
        class="card-title cosy:text-lg cosy:font-medium cosy:text-base-content"
      >
        {{ title }}
      </h3>
      <p v-if="description" class="cosy:text-base-content/70">
        {{ description }}
      </p>
    </div>
  </component>
</template>
