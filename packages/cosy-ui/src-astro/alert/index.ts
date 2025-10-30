// Props Builder（内部工具）
export {
	AlertPropsBuilder,
	alertProps,
} from "../../src/components/alert/AlertPropsBuilder";
export { default as Alert } from "./Alert.astro";
// Alert Factory（链式调用）
export { AlertFactory } from "./AlertFactory";
export type { IAlertProps } from "./props";
