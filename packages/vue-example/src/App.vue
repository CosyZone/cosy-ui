<script setup lang="ts">
import {
	Alert,
	Button,
	Container,
	Counter,
	Heading,
	ApplePhone,
} from "@coffic/cosy-ui/vue";
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
	XCircleIcon,
} from "@coffic/cosy-ui/vue";
</script>

<template>
    <Container border flex="col" gap="md">
        <ApplePhone height="sm" />
        <Button>Click me</Button>

        <Alert type="success">
            <p>This is an alert</p>
        </Alert>

        <Alert type="error">
            <p>This is an error alert</p>
        </Alert>

        <Alert type="warning">
            <p>This is a warning alert</p>
        </Alert>

        <Counter></Counter>

        <!-- 图标展示区域 -->
        <div class="cosy:mt-8">
            <h2 class="cosy:text-2xl cosy:font-bold cosy:mb-4 cosy:text-center">
                图标展示
            </h2>
            <div class="cosy:grid cosy:grid-cols-4 cosy:gap-4 cosy:p-4 cosy:bg-base-200 cosy:rounded-lg">
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <AlertTriangleIcon size="32px" color="#f59e0b" />
                    <span class="cosy:text-sm">AlertTriangle</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <CalendarIcon size="32px" color="#3b82f6" />
                    <span class="cosy:text-sm">Calendar</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <CheckIcon size="32px" color="#10b981" />
                    <span class="cosy:text-sm">Check</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <CheckCircleIcon size="32px" color="#10b981" />
                    <span class="cosy:text-sm">CheckCircle</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <ChevronDownIcon size="32px" color="#6b7280" />
                    <span class="cosy:text-sm">ChevronDown</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <ClipboardIcon size="32px" color="#8b5cf6" />
                    <span class="cosy:text-sm">Clipboard</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <CloseIcon size="32px" color="#ef4444" />
                    <span class="cosy:text-sm">Close</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <ErrorIcon size="32px" color="#ef4444" />
                    <span class="cosy:text-sm">Error</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <InboxArchiveIcon size="32px" color="#f97316" />
                    <span class="cosy:text-sm">InboxArchive</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <InfoCircleIcon size="32px" color="#3b82f6" />
                    <span class="cosy:text-sm">InfoCircle</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <InfoIcon size="32px" color="#3b82f6" />
                    <span class="cosy:text-sm">Info</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <LinkIcon size="32px" color="#06b6d4" />
                    <span class="cosy:text-sm">Link</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <MenuIcon size="32px" color="#6b7280" />
                    <span class="cosy:text-sm">Menu</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <SearchIcon size="32px" color="#8b5cf6" />
                    <span class="cosy:text-sm">Search</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <SettingsIcon size="32px" color="#6b7280" />
                    <span class="cosy:text-sm">Settings</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <SuccessIcon size="32px" color="#10b981" />
                    <span class="cosy:text-sm">Success</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <UserIcon size="32px" color="#6366f1" />
                    <span class="cosy:text-sm">User</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <WarningIcon size="32px" color="#f59e0b" />
                    <span class="cosy:text-sm">Warning</span>
                </div>
                <div
                    class="cosy:flex cosy:flex-col cosy:items-center cosy:gap-2 cosy:p-3 cosy:bg-base-100 cosy:rounded-lg">
                    <XCircleIcon size="32px" color="#ef4444" />
                    <span class="cosy:text-sm">XCircle</span>
                </div>
            </div>
        </div>
    </Container>
</template>
