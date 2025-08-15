/**
 * Vue 图标组件的通用接口定义
 */

export interface IIconProps {
    /**
     * 图标的大小
     * @default "24px"
     */
    size?: string;
    /**
     * 图标的颜色
     * @default "currentColor"
     */
    color?: string;
    /**
     * 自定义类名
     */
    class?: string;
}

/**
 * 图标数据接口
 */
export interface IIconData {
    /**
     * 图标路径数据
     */
    path: string;
    /**
     * 额外的视图框设置，默认为"0 0 24 24"
     */
    viewBox?: string;
}

/**
 * 图标名称类型，按字母顺序排序
 */
export type IconName =
    | 'alertTriangle'
    | 'calendar'
    | 'checkCircle'
    | 'check'
    | 'chevronDown'
    | 'clipboard'
    | 'close'
    | 'error'
    | 'inboxArchive'
    | 'infoCircle'
    | 'info'
    | 'link'
    | 'menu'
    | 'refresh'
    | 'search'
    | 'settings'
    | 'success'
    | 'user'
    | 'view'
    | 'warning'
    | 'xCircle'
    | 'code'
    | 'delete'
    | 'edit'
    | 'facebook'
    | 'github'
    | 'globe'
    | 'linkedin'
    | 'twitter'
    | 'sunCloudy'
    | 'home'
    | 'dashboard'
    | 'chart'
    | 'document'
    | 'notification'
    | 'users'
    | 'message'
    | 'mail'
    | 'folder'
    | 'star'
    | 'heart'
    | 'save'
    | 'tools'
    | 'wallet'
    | 'logOut'
    | 'report'
    | 'security'
    | 'upload'
    | 'download'
    | 'appstore'
    | 'website'
    | 'mapPin'
    | 'phone'; 
