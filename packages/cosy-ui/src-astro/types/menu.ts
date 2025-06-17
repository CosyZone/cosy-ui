/**
 * 菜单项接口
 */
export interface IMenuItem {
  /**
   * 菜单项文本
   */
  text: string;

  /**
   * 菜单项链接
   */
  href: string;

  /**
   * 菜单项图标
   */
  icon: string;

  /**
   * 子菜单项
   */
  items?: IMenuItem[];
}
