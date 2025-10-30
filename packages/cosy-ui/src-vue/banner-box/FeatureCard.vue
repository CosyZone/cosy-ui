<script setup lang="ts">
import {
	RiAppsLine,
	RiArticleLine,
	RiBarChartLine,
	// 文档相关
	RiBookOpenLine,
	RiBracesLine,
	RiBrainLine,
	RiChat1Line,
	// 云服务相关
	RiCloudLine,
	RiCloudOffLine,
	RiCodeSSlashLine,
	RiCommandLine,
	RiComputerLine,
	RiCpuLine,
	RiDashboardLine,
	RiDatabase2Line,
	RiDownloadCloud2Line,
	RiDraftLine,
	RiFileListLine,
	RiFileTextLine,
	RiGitBranchLine,
	// 开发相关
	RiGithubFill,
	RiHeartLine,
	// 媒体相关
	RiImage2Line,
	RiKeyLine,
	RiLightbulbLine,
	RiLineChartLine,
	RiLockLine,
	RiMessage2Line,
	RiMovieLine,
	RiMusic2Line,
	// 数据相关
	RiPieChartLine,
	RiPlayCircleLine,
	RiPlugLine,
	// AI/机器学习相关
	RiRobot2Line,
	// 其他常用
	RiRocketLine,
	RiServerLine,
	RiSettings4Line,
	RiShareLine,
	// 安全相关
	RiShieldLine,
	// 设备相关
	RiSmartphoneLine,
	RiStarLine,
	RiTabletLine,
	RiTeamLine,
	RiTerminalBoxLine,
	RiThumbUpLine,
	// 工具相关
	RiToolsLine,
	RiUploadCloud2Line,
	// 社交相关
	RiUserLine,
	RiUserSettingsLine,
	RiVideoLine,
	RiWifiLine,
} from "@remixicon/vue";
import { type Component, computed } from "vue";

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
