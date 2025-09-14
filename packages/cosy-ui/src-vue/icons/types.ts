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
    | 'appstore'
    | 'calendar'
    | 'chart'
    | 'check'
    | 'checkCircle'
    | 'chevronDown'
    | 'chevronLeft'
    | 'chevronRight'
    | 'clipboard'
    | 'close'
    | 'code'
    | 'dashboard'
    | 'delete'
    | 'document'
    | 'download'
    | 'edit'
    | 'error'
    | 'facebook'
    | 'folder'
    | 'github'
    | 'globe'
    | 'heart'
    | 'home'
    | 'iphoneBattery'
    | 'iphoneSignal'
    | 'iphoneWifi'
    | 'inboxArchive'
    | 'info'
    | 'infoCircle'
    | 'link'
    | 'linkedin'
    | 'logOut'
    | 'mail'
    | 'mapPin'
    | 'menu'
    | 'message'
    | 'notification'
    | 'phone'
    | 'refresh'
    | 'report'
    | 'save'
    | 'search'
    | 'security'
    | 'settings'
    | 'smart'
    | 'star'
    | 'success'
    | 'sunCloudy'
    | 'tools'
    | 'twitter'
    | 'upload'
    | 'user'
    | 'users'
    | 'view'
    | 'wallet'
    | 'warning'
    | 'wechat'
    | 'website'
    | 'whatsapp'
    | 'xCircle'; 
