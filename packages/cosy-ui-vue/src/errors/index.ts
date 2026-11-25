export { default as Error403 } from "./Error403.vue";
export { default as Error404 } from "./Error404.vue";
export { default as Error500 } from "./Error500.vue";
export { default as Error503 } from "./Error503.vue";
export { default as ErrorPage } from "./ErrorPage.vue";

// Export types
export type {
	IError403VueProps as Error403Props,
	IError404VueProps as Error404Props,
	IError500VueProps as Error500Props,
	IError503VueProps as Error503Props,
	IErrorPageVueProps as ErrorPageProps,
} from "./props";
