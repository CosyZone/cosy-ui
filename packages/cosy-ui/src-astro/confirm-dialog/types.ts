export interface ConfirmDialogProps {
	/**
	 * 对话框的唯一标识符
	 */
	id: string;

	/**
	 * 对话框标题
	 */
	title?: string;

	/**
	 * 对话框消息内容
	 */
	message: string;

	/**
	 * 取消按钮文本
	 */
	cancelText?: string;

	/**
	 * 确认按钮文本
	 */
	confirmText?: string;

	/**
	 * 自定义类名
	 */
	class?: string;
}

export interface ConfirmDialogStyle {
	bg: string;
	border: string;
	text: string;
	confirmBtn: string;
	cancelBtn: string;
}

export const getConfirmDialogStyle = (): ConfirmDialogStyle => ({
	bg: "cosy:bg-base-100",
	border: "cosy:border-base-300",
	text: "cosy:text-base-content",
	confirmBtn: "cosy:btn cosy:btn-primary",
	cancelBtn: "cosy:btn cosy:btn-ghost",
});
