import type {
	IError403Props,
	IError404Props,
	IError500Props,
	IError503Props,
	IErrorPageProps,
} from "../../src/components/errors/errorPropsBase";

/**
 * Error403 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IError403VueProps extends IError403Props {}

/**
 * Error404 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IError404VueProps extends IError404Props {}

/**
 * Error500 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IError500VueProps extends IError500Props {}

/**
 * Error503 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IError503VueProps extends IError503Props {}

/**
 * ErrorPage 组件的 Vue 版本属性接口（继承基础接口）
 */
export interface IErrorPageVueProps extends IErrorPageProps {}
