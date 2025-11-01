import BasicContainer from "./BasicContainer.astro";
import ErrorCodeContainer from "./ErrorCodeContainer.astro";
import MaintenanceModeContainer from "./MaintenanceModeContainer.astro";
import WithDebugContainer from "./WithDebugContainer.astro";

export const ErrorPagesPackage = {
	Basic: BasicContainer,
	ErrorCode: ErrorCodeContainer,
	MaintenanceMode: MaintenanceModeContainer,
	WithDebug: WithDebugContainer,
	// 其他 props 的示例暂时使用 Basic，后续可以添加
	WithLoginUrl: BasicContainer,
	WithContactUrl: BasicContainer,
	WithSupportUrl: BasicContainer,
	WithStatusPageUrl: BasicContainer,
	WithNotificationUrl: BasicContainer,
	WithEstimatedRecovery: MaintenanceModeContainer,
};
