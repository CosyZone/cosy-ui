export { default as Alert } from "./Alert.vue";

// Export types
export interface AlertProps {
	type?: "info" | "success" | "warning" | "error";
	title?: string;
	class?: string;
}
