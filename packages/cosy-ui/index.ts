import "./app.css";

// 通用配置与工具
export * from "./internal/common";
export * from "./internal/utils/i18n";
export * from "./internal/utils/image";
export * from "./internal/utils/lang_package";
export * from "./internal/utils/language";
export * from "./internal/utils/link";
export * from "./internal/utils/logger";
export * from "./internal/utils/mac-window-bg";
export * from "./internal/utils/path";
export * from "./internal/utils/social";
export * from "./internal/utils/theme";
export * from "./internal/utils/url";

// 基础组件和功能模块 (按字母顺序)
export { default as Alert } from "./src/Alert.astro";
export type { AlertMarginSize, IAlertProps } from "./src/Alert.astro";
export { default as AlertDialog } from "./src/AlertDialog.astro";
export { default as ApiTester } from "./src/ApiTester.astro";
export type { IApiEndpoint, IApiParam, IApiTesterProps, IQuickTest } from "./src/ApiTester.astro";
export { default as ApplePhone } from "./src/ApplePhone.astro";
export type { IApplePhoneProps, ApplePhoneHeight } from "./src/ApplePhone.astro";
export { default as Article } from "./src/Article.astro";
export type { ArticleWidth, IArticleProps } from "./src/Article.astro";
export { default as Avatar } from "./src/Avatar.astro";
export type { AvatarSize, AvatarProps } from "./src/Avatar.astro";
export { default as Badge } from "./src/Badge.astro";
export type { IBadgePropsBase, IBadgeProps } from "./src/Badge.astro";
export { default as Banner } from "./src/Banner.astro";
export type { IBannerPropsBase } from "./src/Banner.astro";
export { default as Button } from "./src/Button.astro";
export type { IButtonProps } from "./src/Button.astro";
export { default as Card } from "./src/Card.astro";
export type { ICardPropsBase, ICardProps } from "./src/Card.astro";
export { default as CardBook } from "./src/CardBook.astro";
export type { ICardBookProps as CardBookProps } from "./src/CardBook.astro";
export { default as CardCourse } from "./src/CardCourse.astro";
export type { CardCourseProps, IconSize, PaddingSize } from "./src/CardCourse.astro";
export * from "./internal/config/card-course";
export { default as Carousel } from "./src/Carousel.astro";
export type { ICarouselItem, ICarouselProps } from "./src/Carousel.astro";
export { default as CodeBlock } from "./src/CodeBlock.astro";
export { default as CodeContainer } from "./src/CodeContainer.astro";
export type { Props as CodeContainerProps } from "./src/CodeContainer.astro";
export { default as CodeExample } from "./src/CodeExample.astro";
export { default as CodePanel } from "./src/CodePanel.astro";
export type { CodePanelProps } from "./src/CodePanel.astro";
export { default as ConfirmDialog } from "./src/ConfirmDialog.astro";
export type { ConfirmDialogProps } from "./src/ConfirmDialog.astro";
export { default as Contact } from "./src/Contact.astro";
export type { ContactProps } from "./src/Contact.astro";
export { default as Container } from "./src/Container.astro";
export type { IContainerProps } from "./src/Container.astro";
export { default as EmptyState } from "./src/EmptyState.astro";
export type { IconName, EmptyStateProps } from "./src/EmptyState.astro";
export { default as Error403 } from "./src/Error403.astro";
export type { Error403Props } from "./src/Error403.astro";
export { default as Error404 } from "./src/Error404.astro";
export type { Error404Props } from "./src/Error404.astro";
export { default as Error404Basic } from "./src/Error404Basic.astro";
export { default as Error500 } from "./src/Error500.astro";
export type { Error500Props } from "./src/Error500.astro";
export { default as Error503 } from "./src/Error503.astro";
export type { Error503Props } from "./src/Error503.astro";
export { default as ErrorPage } from "./src/ErrorPage.astro";
export type { ErrorPageProps } from "./src/ErrorPage.astro";
export { default as FeatureCard } from "./src/FeatureCard.astro";
export type { FeatureCardProps } from "./src/FeatureCard.astro";
export { default as FeatureCarousel } from "./src/FeatureCarousel.astro";
export type { FeatureCarouselFeature, FeatureCarouselProps } from "./src/FeatureCarousel.astro";
export { default as Flex } from "./src/Flex.astro";
export type { IFlexProps } from "./src/Flex.astro";
export { default as Footer } from "./src/Footer.astro";
export type { IFooterProps, IAboutInfo, IContactInfo, ILegalInfo, IResourcesInfo } from "./src/Footer.astro";
export { default as Grid } from "./src/Grid.astro";
export type { IGridProps, GridProps } from "./src/Grid.astro";
export { default as Header } from "./src/Header.astro";
export type { IHeaderProps, INavItem } from "./src/Header.astro";
export { default as Heading } from "./src/Heading.astro";
export type { HeadingLevel, HeadingWeight, IHeadingProps } from "./src/Heading.astro";
export { default as Hero } from "./src/Hero.astro";
export type {
	HeroAlign,
	HeroBackgroundOverlay,
	HeroImageConfig,
	HeroImagePosition,
	HeroProps,
	HeroTextBackground,
	IHeroLink,
} from "./src/Hero.astro";
// 图标组件
export * from "./icons";
export { default as Image } from "./src/Image.astro";
export type { ImageSource } from "./src/Image.astro";
export { default as Image3 } from "./src/Image3.astro";
export type { IImage3Item, IImage3Props } from "./src/Image3.astro";
export { default as ImageRow } from "./src/ImageRow.astro";
export type { IImageItem, ImageRowProps } from "./src/ImageRow.astro";
export { default as ImagesCircle } from "./src/ImagesCircle.astro";
export type { IImagesCircleProps } from "./src/ImagesCircle.astro";
export { default as InstallTabs } from "./src/InstallTabs.astro";
export type { InstallTabsProps } from "./src/InstallTabs.astro";
export { default as LanguageSwitcher } from "./src/LanguageSwitcher.astro";
export { default as AppLayout } from "./src/AppLayout.astro";
export type { IAppLayoutAllProps } from "./src/AppLayout.astro";
export { default as AppHeader } from "./src/AppHeader.astro";
export { default as BaseLayout } from "./src/BaseLayout.astro";
export type { IAppLayoutProps } from "./src/AppLayout.astro";
export { default as BaseLayoutHtml } from "./src/BaseLayoutHtml.astro";
export { default as Body } from "./src/Body.astro";
export { default as BodyDiv } from "./src/BodyDiv.astro";
export { default as BodyElement } from "./src/BodyElement.astro";
export { default as Head } from "./src/Head.astro";
export { default as DashboardLayout } from "./src/DashboardLayout.astro";
export { default as DashboardSidebar } from "./src/DashboardSidebar.astro";
export { default as DashboardTopNavbar } from "./src/DashboardTopNavbar.astro";
export type { NavItem, SidebarSize, UserMenuItem } from "./internal/components/layout-dashboard";
export { getIconFromHref, getNavItemIcon, getSidebarWidth } from "./internal/components/layout-dashboard";
export { default as Link } from "./src/Link.astro";
export type { LinkSize, LinkVariant, LinkAnimation, ILinkProps } from "./src/Link.astro";
export { default as ListItem } from "./src/ListItem.astro";
export type { IListItemProps } from "./src/ListItem.astro";
export { default as LoadingOverlay } from "./src/LoadingOverlay.astro";
export type { Props as LoadingOverlayProps } from "./src/LoadingOverlay.astro";
export { default as Login } from "./src/Login.astro";
export type { Props as LoginProps } from "./src/Login.astro";
export { default as Logout } from "./src/Logout.astro";
export type { Props as LogoutProps } from "./src/Logout.astro";
export { default as MacWindow } from "./src/MacWindow.astro";
export type { IMacWindowProps, MacWindowWidth } from "./src/MacWindow.astro";
export { default as Main } from "./src/Main.astro";
export type { IMainContentProps } from "./src/Main.astro";
export { MainFactory } from "./MainFactory";
export { default as MathFormula } from "./src/MathFormula.astro";
export type { IMathFormulaProps, IMathFormulaPropsBase, MathFormulaVariant } from "./src/MathFormula.astro";
export { default as Modal } from "./src/Modal.astro";
export type { ModalProps } from "./src/Modal.astro";
export { default as Module } from "./src/Module.astro";
export type { IModuleProps } from "./src/Module.astro";
export { default as NavSection } from "./src/NavSection.astro";
export type { INavSectionProps, NavSectionLink } from "./src/NavSection.astro";
export { default as PhotoWall } from "./src/PhotoWall.astro";
export type { IPhotoWallProps, PhotoCardData } from "./src/PhotoWall.astro";
export { default as PictureBookPage } from "./src/PictureBookPage.astro";
export type { IPictureBookPageProps } from "./src/PictureBookPage.astro";
export { default as PictureBookTextBox } from "./src/PictureBookTextBox.astro";
export type { IPictureBookTextBoxProps } from "./src/PictureBookTextBox.astro";
export { default as PlaceHolder } from "./src/Placeholder.astro";
export type { PlaceholderPaddingSize, PlaceholderBorderSize, PlaceHolderProps } from "./src/Placeholder.astro";
export { default as ProductCard } from "./src/ProductCard.astro";
export type { Props as ProductCardProps } from "./src/ProductCard.astro";
export { default as ProductHero } from "./src/ProductHero.astro";
export type { Props as ProductHeroProps } from "./src/ProductHero.astro";
export { default as ProductHeroContent } from "./src/ProductHeroContent.astro";
export { default as ProductHeroImage } from "./src/ProductHeroImage.astro";
export { default as Products } from "./src/Products.astro";
export type { Props as ProductsProps } from "./src/Products.astro";
export { default as Prose } from "./src/Prose.astro";
export type { IProseProps } from "./src/Prose.astro";
export { default as Register } from "./src/Register.astro";
export type { Props as RegisterProps } from "./src/Register.astro";
export { default as Review } from "./src/Review.astro";
export type { ReviewData, ReviewProps } from "./src/Review.astro";
export { default as Reviews } from "./src/Reviews.astro";
export type { ReviewsProps } from "./src/Reviews.astro";
export { default as ScrollRow } from "./src/ScrollRow.astro";
export type { IScrollRowProps } from "./src/ScrollRow.astro";
export { default as Sidebar } from "./src/Sidebar.astro";
export type { ISidebarProps, ISidebarItem } from "./src/Sidebar.astro";
export { default as Skeleton } from "./src/Skeleton.astro";
export type { Props as SkeletonProps } from "./src/Skeleton.astro";
export { default as SmartBg } from "./src/SmartBg.astro";
export type { ISmartBgProps } from "./src/SmartBg.astro";
export { default as SmartIcon } from "./src/SmartIcon.astro";
export type { default as SmartIconProps } from "./src/SmartIcon.astro";
export { default as SocialIcon } from "./src/SocialIcon.astro";
export type { default as SocialIconProps } from "./src/SocialIcon.astro";
export { default as Speak } from "./src/Speak.astro";
export type { ISpeakProps } from "./src/Speak.astro";
export { default as Stack } from "./src/Stack.astro";
export type { IStackProps } from "./src/Stack.astro";
export { default as StatsDisplay } from "./src/StatsDisplay.astro";
export type {
	StatItem,
	StatsAlignment,
	StatsDisplayProps,
	StatsFontSize,
	StatsFontWeight,
	StatsPresetColor,
	StatsSpacing,
} from "./src/StatsDisplay.astro";
export { default as TeamMember } from "./src/TeamMember.astro";
export type { ITeamMemberProps, TeamMemberSocialLink } from "./src/TeamMember.astro";
export { default as TeamMembers } from "./src/TeamMembers.astro";
export type { TeamMembersProps } from "./src/TeamMembers.astro";
export { default as Text } from "./src/Text.astro";
export type { ITextProps } from "./src/Text.astro";
export { default as Toast } from "./src/Toast.astro";
export type { ToastType, ToastConfig, ToastItem } from "./src/Toast.astro";
export { default as ToastContainer } from "./src/ToastContainer.astro";
export { default as TableOfContents } from "./src/TableOfContents.astro";
