import "./app.css";

// 通用工具和配置 (按字母顺序)
export * from "./src/common";
export * from "./src/common/sidebar";
export * from "./src/components/footer/types";
export * from "./src/components/header/types";
export * from "./src/utils/i18n";
// 工具类型 (按字母顺序)
export type { ImageOptions, ImageProvider } from "./src/utils/image";
export * from "./src/utils/image";
export * from "./src/utils/lang_package";
export * from "./src/utils/language";
export * from "./src/utils/link";
export * from "./src/utils/logger";
export * from "./src/utils/mac-window-bg";
export * from "./src/utils/path";
export * from "./src/utils/url";
// 基础组件和功能模块 (按字母顺序)
export { default as Alert } from "./src-astro/Alert.astro";
export type { AlertMarginSize, IAlertProps } from "./src-astro/Alert.astro";
export { default as AlertDialog } from "./src-astro/AlertDialog.astro";
export { default as ApiTester } from "./src-astro/ApiTester.astro";
export { default as ApplePhone } from "./src-astro/ApplePhone.astro";
export type { IApplePhoneProps, ApplePhoneHeight } from "./src-astro/ApplePhone.astro";
export { default as Article } from "./src-astro/Article.astro";
export type { ArticleWidth, IArticleProps } from "./src-astro/Article.astro";
export { default as Avatar } from "./src-astro/Avatar.astro";
export type { AvatarSize, AvatarProps } from "./src-astro/Avatar.astro";
export { default as Badge } from "./src-astro/Badge.astro";
export type { IBadgePropsBase, IBadgeProps } from "./src-astro/Badge.astro";
export { default as Banner } from "./src-astro/Banner.astro";
export type { IBannerPropsBase } from "./src-astro/Banner.astro";
export { default as Button } from "./src-astro/Button.astro";
export type { IButtonProps } from "./src-astro/Button.astro";
export { default as Card } from "./src-astro/Card.astro";
export type { ICardPropsBase, ICardProps } from "./src-astro/Card.astro";
export { default as CardBook } from "./src-astro/CardBook.astro";
export type { ICardBookProps as CardBookProps } from "./src-astro/CardBook.astro";
export { default as CardCourse } from "./src-astro/CardCourse.astro";
export type { CardCourseProps, IconSize, PaddingSize } from "./src-astro/CardCourse.astro";
export * from "./src-astro/card-course/config";
export { default as Carousel } from "./src-astro/Carousel.astro";
export type { ICarouselItem, ICarouselProps } from "./src-astro/Carousel.astro";
export { default as CodeBlock } from "./src-astro/CodeBlock.astro";
export { default as CodeContainer } from "./src-astro/CodeContainer.astro";
export type { Props as CodeContainerProps } from "./src-astro/CodeContainer.astro";
export { default as CodeExample } from "./src-astro/CodeExample.astro";
export { default as CodePanel } from "./src-astro/CodePanel.astro";
export type { CodePanelProps } from "./src-astro/CodePanel.astro";
export { default as ConfirmDialog } from "./src-astro/ConfirmDialog.astro";
export type { ConfirmDialogProps } from "./src-astro/ConfirmDialog.astro";
export { default as Contact } from "./src-astro/Contact.astro";
export type { ContactProps } from "./src-astro/Contact.astro";
export { default as Container } from "./src-astro/Container.astro";
export type { IContainerProps } from "./src-astro/Container.astro";
export { default as EmptyState } from "./src-astro/EmptyState.astro";
export type { IconName, EmptyStateProps } from "./src-astro/EmptyState.astro";
export { default as Error403 } from "./src-astro/Error403.astro";
export type { Error403Props } from "./src-astro/Error403.astro";
export { default as Error404 } from "./src-astro/Error404.astro";
export type { Error404Props } from "./src-astro/Error404.astro";
export { default as Error404Basic } from "./src-astro/Error404Basic.astro";
export { default as Error500 } from "./src-astro/Error500.astro";
export type { Error500Props } from "./src-astro/Error500.astro";
export { default as Error503 } from "./src-astro/Error503.astro";
export type { Error503Props } from "./src-astro/Error503.astro";
export { default as ErrorPage } from "./src-astro/ErrorPage.astro";
export type { ErrorPageProps } from "./src-astro/ErrorPage.astro";
export { default as FeatureCard } from "./src-astro/FeatureCard.astro";
export type { FeatureCardProps } from "./src-astro/FeatureCard.astro";
export { default as FeatureCarousel } from "./src-astro/FeatureCarousel.astro";
export type { FeatureCarouselFeature, FeatureCarouselProps } from "./src-astro/FeatureCarousel.astro";
export { default as Flex } from "./src-astro/Flex.astro";
export type { IFlexProps } from "./src-astro/Flex.astro";
export { default as Footer } from "./src-astro/Footer.astro";
export type { IFooterProps, IAboutInfo, IContactInfo, ILegalInfo, IResourcesInfo } from "./src-astro/Footer.astro";
export { default as Grid } from "./src-astro/Grid.astro";
export type { IGridProps, GridProps } from "./src-astro/Grid.astro";
export { default as Header } from "./src-astro/Header.astro";
export type { IHeaderProps } from "./src-astro/Header.astro";
export { default as Heading } from "./src-astro/Heading.astro";
export type { HeadingLevel, HeadingWeight, IHeadingProps } from "./src-astro/Heading.astro";
export { default as Hero } from "./src-astro/Hero.astro";
export type {
	HeroAlign,
	HeroBackgroundOverlay,
	HeroImageConfig,
	HeroImagePosition,
	HeroProps,
	HeroTextBackground,
	IHeroLink,
} from "./src-astro/Hero.astro";
// 图标组件
export * from "./src-astro/icons";
export { default as Image } from "./src-astro/Image.astro";
export type { ImageSource } from "./src-astro/Image.astro";
export { default as Image3 } from "./src-astro/Image3.astro";
export type { IImage3Item, IImage3Props } from "./src-astro/Image3.astro";
export { default as ImageRow } from "./src-astro/ImageRow.astro";
export type { IImageItem, ImageRowProps } from "./src-astro/ImageRow.astro";
export { default as ImagesCircle } from "./src-astro/ImagesCircle.astro";
export type { IImagesCircleProps } from "./src-astro/ImagesCircle.astro";
export { default as InstallTabs } from "./src-astro/InstallTabs.astro";
export type { InstallTabsProps } from "./src-astro/InstallTabs.astro";
export { default as LanguageSwitcher } from "./src-astro/LanguageSwitcher.astro";
export { default as AppLayout } from "./src-astro/AppLayout.astro";
export type { IAppLayoutAllProps } from "./src-astro/AppLayout.astro";
export { default as AppHeader } from "./src-astro/AppHeader.astro";
export { default as BaseLayout } from "./src-astro/BaseLayout.astro";
export type { IMetaProps } from "./src/common/meta";
export type { IAppLayoutProps } from "./src-astro/layout-basic/layout";
export { default as BaseLayoutHtml } from "./src-astro/BaseLayoutHtml.astro";
export { default as Body } from "./src-astro/Body.astro";
export { default as BodyDiv } from "./src-astro/BodyDiv.astro";
export { default as BodyElement } from "./src-astro/BodyElement.astro";
export { default as Head } from "./src-astro/Head.astro";
export { default as DashboardLayout } from "./src-astro/DashboardLayout.astro";
export { default as DashboardSidebar } from "./src-astro/DashboardSidebar.astro";
export { default as DashboardTopNavbar } from "./src-astro/DashboardTopNavbar.astro";
export type { SidebarSize, UserMenuItem } from "./src-astro/layout-dashboard/types";
export { getIconFromHref, getNavItemIcon, getSidebarWidth } from "./src-astro/layout-dashboard/types";
export { default as Link } from "./src-astro/Link.astro";
export type { LinkSize, LinkVariant, LinkAnimation, ILinkProps } from "./src-astro/Link.astro";
export { default as ListItem } from "./src-astro/ListItem.astro";
export type { IListItemProps } from "./src-astro/ListItem.astro";
export { default as LoadingOverlay } from "./src-astro/LoadingOverlay.astro";
export type { Props as LoadingOverlayProps } from "./src-astro/LoadingOverlay.astro";
export { default as Login } from "./src-astro/Login.astro";
export type { Props as LoginProps } from "./src-astro/Login.astro";
export { default as Logout } from "./src-astro/Logout.astro";
export type { Props as LogoutProps } from "./src-astro/Logout.astro";
export { default as MacWindow } from "./src-astro/MacWindow.astro";
export type { IMacWindowProps, MacWindowWidth } from "./src-astro/MacWindow.astro";
export { default as Main } from "./src-astro/Main.astro";
export type { IMainContentProps } from "./src-astro/Main.astro";
export { MainFactory } from "./src-astro/MainFactory";
export { default as MathFormula } from "./src-astro/MathFormula.astro";
export type { IMathFormulaProps } from "./src-astro/math-formula/props";
export type { IMathFormulaPropsBase, MathFormulaVariant } from "./src-astro/math-formula/types";
export { default as Modal } from "./src-astro/Modal.astro";
export type { ModalProps } from "./src-astro/Modal.astro";
export { default as Module } from "./src-astro/Module.astro";
export type { IModuleProps } from "./src-astro/Module.astro";
export { default as NavSection } from "./src-astro/NavSection.astro";
export type { INavSectionProps, NavSectionLink } from "./src-astro/NavSection.astro";
export { default as PhotoWall } from "./src-astro/PhotoWall.astro";
export type { IPhotoWallProps, PhotoCardData } from "./src-astro/PhotoWall.astro";
export { default as PictureBookPage } from "./src-astro/PictureBookPage.astro";
export type { IPictureBookPageProps } from "./src-astro/PictureBookPage.astro";
export { default as PictureBookTextBox } from "./src-astro/PictureBookTextBox.astro";
export type { IPictureBookTextBoxProps } from "./src-astro/PictureBookTextBox.astro";
export { default as PlaceHolder } from "./src-astro/Placeholder.astro";
export type { PlaceholderPaddingSize, PlaceholderBorderSize, PlaceHolderProps } from "./src-astro/Placeholder.astro";
export { default as ProductCard } from "./src-astro/ProductCard.astro";
export type { Props as ProductCardProps } from "./src-astro/ProductCard.astro";
export { default as ProductHero } from "./src-astro/ProductHero.astro";
export type { Props as ProductHeroProps } from "./src-astro/ProductHero.astro";
export { default as ProductHeroContent } from "./src-astro/ProductHeroContent.astro";
export { default as ProductHeroImage } from "./src-astro/ProductHeroImage.astro";
export { default as Products } from "./src-astro/Products.astro";
export type { Props as ProductsProps } from "./src-astro/Products.astro";
export { default as Prose } from "./src-astro/Prose.astro";
export type { IProseProps } from "./src-astro/Prose.astro";
export { default as Register } from "./src-astro/Register.astro";
export type { Props as RegisterProps } from "./src-astro/Register.astro";
export { default as Review } from "./src-astro/Review.astro";
export type { ReviewData, ReviewProps } from "./src-astro/Review.astro";
export { default as Reviews } from "./src-astro/Reviews.astro";
export type { ReviewsProps } from "./src-astro/Reviews.astro";
export { default as ScrollRow } from "./src-astro/ScrollRow.astro";
export type { IScrollRowProps } from "./src-astro/ScrollRow.astro";
export { default as Sidebar } from "./src-astro/Sidebar.astro";
export type { ISidebarProps, ISidebarItem } from "./src-astro/Sidebar.astro";
export { default as Skeleton } from "./src-astro/Skeleton.astro";
export type { Props as SkeletonProps } from "./src-astro/Skeleton.astro";
export { default as SmartBg } from "./src-astro/SmartBg.astro";
export type { ISmartBgProps } from "./src-astro/SmartBg.astro";
export { default as SmartIcon } from "./src-astro/SmartIcon.astro";
export type { default as SmartIconProps } from "./src-astro/SmartIcon.astro";
export { default as SocialIcon } from "./src-astro/SocialIcon.astro";
export type { default as SocialIconProps } from "./src-astro/SocialIcon.astro";
export { default as Speak } from "./src-astro/Speak.astro";
export type { ISpeakProps } from "./src-astro/Speak.astro";
export { default as Stack } from "./src-astro/Stack.astro";
export type { IStackProps } from "./src-astro/Stack.astro";
export { default as StatsDisplay } from "./src-astro/StatsDisplay.astro";
export type {
	StatItem,
	StatsAlignment,
	StatsDisplayProps,
	StatsFontSize,
	StatsFontWeight,
	StatsPresetColor,
	StatsSpacing,
} from "./src-astro/StatsDisplay.astro";
export { default as TeamMember } from "./src-astro/TeamMember.astro";
export type { ITeamMemberProps, TeamMemberSocialLink } from "./src-astro/TeamMember.astro";
export { default as TeamMembers } from "./src-astro/TeamMembers.astro";
export type { TeamMembersProps } from "./src-astro/TeamMembers.astro";
export { default as Text } from "./src-astro/Text.astro";
export type { ITextProps } from "./src-astro/Text.astro";
export { default as Toast } from "./src-astro/Toast.astro";
export type { ToastType, ToastConfig, ToastItem } from "./src-astro/Toast.astro";
export { default as ToastContainer } from "./src-astro/ToastContainer.astro";
export { default as TableOfContents } from "./src-astro/TableOfContents.astro";
// 类型定义 (按字母顺序)
export * from "./src-astro/types/api-test";
export * from "./src-astro/types/heading";
export * from "./src-astro/types/nav";
export * from "./src-astro/types/product";
export * from "./src-astro/types/static-path";
