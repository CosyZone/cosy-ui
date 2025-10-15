import type { HTMLAttributes } from "astro/types";

export type LinkSize = "sm" | "md" | "lg";

export type LinkVariant =
	| "default"
	| "primary"
	| "secondary"
	| "text"
	| "cta"
	| "ghost"
	| "light"
	| "navigation"
	| "github";

export type LinkAnimation =
	| "none"
	| "hover-lift"
	| "hover-glow"
	| "hover-scale";

export type LinkIconName =
	| "AlertTriangle"
	| "AppStoreIcon"
	| "CalendarIcon"
	| "ChartIcon"
	| "CheckCircle"
	| "CheckIcon"
	| "ChevronDownIcon"
	| "ChevronLeftIcon"
	| "ChevronRightIcon"
	| "ClipboardIcon"
	| "CloseIcon"
	| "CodeIcon"
	| "DashboardIcon"
	| "DeleteIcon"
	| "DocumentIcon"
	| "DownloadIcon"
	| "EditIcon"
	| "ErrorIcon"
	| "FolderIcon"
	| "GithubIcon"
	| "GlobeIcon"
	| "HeartIcon"
	| "HomeIcon"
	| "InfoCircle"
	| "InfoIcon"
	| "InboxArchive"
	| "LinkIcon"
	| "LinkedinIcon"
	| "LogOut"
	| "MailIcon"
	| "MenuIcon"
	| "MessageIcon"
	| "NotificationIcon"
	| "RefreshIcon"
	| "ReportIcon"
	| "SaveIcon"
	| "SearchIcon"
	| "SecurityIcon"
	| "SettingsIcon"
	| "StarIcon"
	| "SunCloudyIcon"
	| "ToolsIcon"
	| "TwitterIcon"
	| "UploadIcon"
	| "UserIcon"
	| "UsersIcon"
	| "WalletIcon"
	| "WarningIcon"
	| "WebsiteIcon"
	| "XCircle";

export interface LinkProps extends HTMLAttributes<"a"> {
	href: string;
	external?: boolean;
	block?: boolean;
	class?: string;
	"class:list"?: any;
	variant?: LinkVariant;
	animation?: LinkAnimation;
	size?: LinkSize;
	debug?: boolean;
	btn?: boolean;
	circle?: boolean;
	ghost?: boolean;
	noUnderline?: boolean;
	rounded?: boolean;
	fullWidth?: boolean;
	color?:
		| "primary"
		| "secondary"
		| "accent"
		| "info"
		| "success"
		| "warning"
		| "error";
	align?: "left" | "center" | "right";
	active?: boolean;
	navigationType?: "previous" | "next";
	icon?: LinkIconName;
	hoverImage?: string;
	hoverImageAlt?: string;
}
