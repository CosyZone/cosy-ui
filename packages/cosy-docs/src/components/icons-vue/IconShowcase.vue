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
</script>

<template>
    <div style="padding: 2rem; background-color: #f8f9fa; border-radius: 0.5rem;">
        <h3 style="margin-bottom: 1.5rem; color: #333; font-size: 1.25rem;">Vue 图标展示</h3>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem;">
            <!-- 基础图标 -->
            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <AlertTriangleIcon size="32px" color="#f59e0b" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">AlertTriangle</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <CalendarIcon size="32px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Calendar</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <CheckIcon size="32px" color="#10b981" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Check</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <CheckCircleIcon size="32px" color="#10b981" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">CheckCircle</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <ChevronDownIcon size="32px" color="#6b7280" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">ChevronDown</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <ClipboardIcon size="32px" color="#8b5cf6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Clipboard</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <CloseIcon size="32px" color="#ef4444" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Close</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <ErrorIcon size="32px" color="#ef4444" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Error</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <InboxArchiveIcon size="32px" color="#f97316" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">InboxArchive</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <InfoCircleIcon size="32px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">InfoCircle</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <InfoIcon size="32px" color="#3b82f6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Info</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <LinkIcon size="32px" color="#06b6d4" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Link</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <MenuIcon size="32px" color="#6b7280" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Menu</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <SearchIcon size="32px" color="#8b5cf6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Search</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <SettingsIcon size="32px" color="#6b7280" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Settings</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <SuccessIcon size="32px" color="#10b981" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Success</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <UserIcon size="32px" color="#8b5cf6" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">User</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <WarningIcon size="32px" color="#f59e0b" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">Warning</p>
            </div>

            <div
                style="text-align: center; padding: 1rem; background: white; border-radius: 0.375rem; border: 1px solid #e5e7eb;">
                <XCircleIcon size="32px" color="#ef4444" />
                <p style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">XCircle</p>
            </div>
        </div>
    </div>
</template>
