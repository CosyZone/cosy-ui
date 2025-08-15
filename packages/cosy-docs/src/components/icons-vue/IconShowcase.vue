<script setup lang="ts">
import {
    AlertTriangleIcon,
    CalendarIcon,
    CheckIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ClipboardIcon,
    CloseIcon,
    ErrorIcon,
    IPhoneBatteryIcon,
    IPhoneSignalIcon,
    IPhoneWifiIcon,
    InboxArchiveIcon,
    InfoCircleIcon,
    InfoIcon,
    LinkIcon,
    MenuIcon,
    SearchIcon,
    SettingsIcon,
    SuccessIcon,
    UserIcon,
    WarningIcon,
    XCircleIcon
} from '@coffic/cosy-ui/vue';

/**
 * @component IconShowcase
 * @description Vue 图标展示组件，展示各种图标的使用方法
 */

// 图标配置数组
const icons = [
    { component: AlertTriangleIcon, name: 'AlertTriangle', color: '#f59e0b' },
    { component: CalendarIcon, name: 'Calendar', color: '#3b82f6' },
    { component: CheckIcon, name: 'Check', color: '#10b981' },
    { component: CheckCircleIcon, name: 'CheckCircle', color: '#10b981' },
    { component: ChevronDownIcon, name: 'ChevronDown', color: '#6b7280' },
    { component: ClipboardIcon, name: 'Clipboard', color: '#8b5cf6' },
    { component: CloseIcon, name: 'Close', color: '#ef4444' },
    { component: ErrorIcon, name: 'Error', color: '#ef4444' },
    { component: IPhoneBatteryIcon, name: 'IPhoneBattery', color: '#10b981' },
    { component: IPhoneSignalIcon, name: 'IPhoneSignal', color: '#3b82f6' },
    { component: IPhoneWifiIcon, name: 'IPhoneWifi', color: '#8b5cf6' },
    { component: InboxArchiveIcon, name: 'InboxArchive', color: '#f97316' },
    { component: InfoCircleIcon, name: 'InfoCircle', color: '#3b82f6' },
    { component: InfoIcon, name: 'Info', color: '#3b82f6' },
    { component: LinkIcon, name: 'Link', color: '#06b6d4' },
    { component: MenuIcon, name: 'Menu', color: '#6b7280' },
    { component: SearchIcon, name: 'Search', color: '#8b5cf6' },
    { component: SettingsIcon, name: 'Settings', color: '#6b7280' },
    { component: SuccessIcon, name: 'Success', color: '#10b981' },
    { component: UserIcon, name: 'User', color: '#8b5cf6' },
    { component: WarningIcon, name: 'Warning', color: '#f59e0b' },
    { component: XCircleIcon, name: 'XCircle', color: '#ef4444' }
];
</script>

<template>
    <div style="padding: 2rem; background-color: #f8f9fa; border-radius: 0.5rem;">
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
            <div v-for="icon in icons" :key="icon.name"
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <component :is="icon.component" size="32px" :color="icon.color" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">{{ icon.name }}</p>
            </div>
        </div>
    </div>
</template>
