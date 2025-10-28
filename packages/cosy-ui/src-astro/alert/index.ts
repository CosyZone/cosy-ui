export { default as Alert } from "./Alert.astro";
export type { IAlertProps } from "./props";

// Props Builder（内部工具）
export {
	AlertPropsBuilder,
	alertProps,
} from "../../src/components/alert/AlertPropsBuilder";
