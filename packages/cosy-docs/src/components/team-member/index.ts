import TeamMemberBasicContainer from "./TeamMemberBasicContainer.astro";
import TeamMemberWithSocialContainer from "./TeamMemberWithSocialContainer.astro";
import TeamMemberCustomStyleContainer from "./TeamMemberCustomStyleContainer.astro";
import TeamMemberShadowDemoContainer from "./TeamMemberShadowDemoContainer.astro";
import TeamMemberMutedContainer from "./TeamMemberMutedContainer.astro";
import TeamMemberBackgroundContainer from "./TeamMemberBackgroundContainer.astro";
import TeamMemberRoundedContainer from "./TeamMemberRoundedContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: TeamMemberBasicContainer,
		WithSocial: TeamMemberWithSocialContainer,
		CustomStyle: TeamMemberCustomStyleContainer,
		ShadowDemo: TeamMemberShadowDemoContainer,
		Muted: TeamMemberMutedContainer,
		Background: TeamMemberBackgroundContainer,
		Rounded: TeamMemberRoundedContainer,
	},
};
