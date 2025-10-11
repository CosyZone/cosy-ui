import type { HTMLAttributes } from "astro/types";

export const iconNames = [
    "TwitterIcon",
    "UserIcon",
    "WarningIcon",
    "XCircle",
    "InfoIcon",
    "LinkIcon",
    "LinkedinIcon",
    "MenuIcon",
    "RefreshIcon",
    "SearchIcon",
    "SuccessIcon",
    "SunCloudyIcon",
    "AlertTriangle",
    "CalendarIcon",
    "CheckCircle",
    "CheckIcon",
    "ClipboardIcon",
    "CloseIcon",
    "CodeIcon",
    "DeleteIcon",
    "ErrorIcon",
    "GithubIcon",
    "InfoCircle",
    "InboxArchive",
    "SettingsIcon",
    "ChevronDownIcon",
    "HomeIcon",
    "DashboardIcon",
    "ChartIcon",
    "DocumentIcon",
    "NotificationIcon",
    "UsersIcon",
    "MessageIcon",
    "MailIcon",
    "FolderIcon",
    "StarIcon",
    "HeartIcon",
    "SaveIcon",
    "EditIcon",
    "ToolsIcon",
    "WalletIcon",
    "ReportIcon",
    "SecurityIcon",
    "UploadIcon",
    "DownloadIcon",
    "LogOut",
    "AppStoreIcon",
    "WebsiteIcon",
] as const;

export type IconName = (typeof iconNames)[number];

export interface EmptyStateProps extends HTMLAttributes<"div"> {
    /**
     * The title of the empty state.
     */
    title?: string;
    /**
     * The description of the empty state.
     */
    description?: string;
    /**
     * The name of the icon to display.
     */
    icon?: IconName;
}
