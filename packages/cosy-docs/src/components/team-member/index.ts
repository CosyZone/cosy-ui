import TeamMemberBackgroundContainer from "./TeamMemberBackgroundContainer.astro";
import TeamMemberBasicContainer from "./TeamMemberBasicContainer.astro";
import TeamMemberCustomStyleContainer from "./TeamMemberCustomStyleContainer.astro";
import TeamMemberMutedContainer from "./TeamMemberMutedContainer.astro";
import TeamMemberRoundedContainer from "./TeamMemberRoundedContainer.astro";
import TeamMemberShadowDemoContainer from "./TeamMemberShadowDemoContainer.astro";
import TeamMemberWithSocialContainer from "./TeamMemberWithSocialContainer.astro";

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
