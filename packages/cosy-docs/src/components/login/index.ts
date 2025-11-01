import LoginBasicContainer from "./LoginBasicContainer.astro";
import LoginCustomClassContainer from "./LoginCustomClassContainer.astro";
import LoginCustomStyleContainer from "./LoginCustomStyleContainer.astro";
import LoginDividerTextContainer from "./LoginDividerTextContainer.astro";
import LoginFooterContainer from "./LoginFooterContainer.astro";
import LoginForgotPasswordTextContainer from "./LoginForgotPasswordTextContainer.astro";
import LoginHeaderContainer from "./LoginHeaderContainer.astro";
import LoginLoginButtonTextContainer from "./LoginLoginButtonTextContainer.astro";
import LoginLogoContainer from "./LoginLogoContainer.astro";
import LoginPasswordLabelContainer from "./LoginPasswordLabelContainer.astro";
import LoginRememberMeTextContainer from "./LoginRememberMeTextContainer.astro";
import LoginShowForgotPasswordContainer from "./LoginShowForgotPasswordContainer.astro";
import LoginShowRememberMeContainer from "./LoginShowRememberMeContainer.astro";
import LoginSocialButtonsContainer from "./LoginSocialButtonsContainer.astro";
import LoginSocialLoginsContainer from "./LoginSocialLoginsContainer.astro";
import LoginSubtitleContainer from "./LoginSubtitleContainer.astro";
import LoginTitleContainer from "./LoginTitleContainer.astro";
import LoginUsernameLabelContainer from "./LoginUsernameLabelContainer.astro";

export const LoginPackage = {
	LoginContainers: {
		Basic: LoginBasicContainer,
		CustomClass: LoginCustomClassContainer,
		CustomStyle: LoginCustomStyleContainer,
		DividerText: LoginDividerTextContainer,
		Footer: LoginFooterContainer,
		ForgotPasswordText: LoginForgotPasswordTextContainer,
		Header: LoginHeaderContainer,
		LoginButtonText: LoginLoginButtonTextContainer,
		Logo: LoginLogoContainer,
		PasswordLabel: LoginPasswordLabelContainer,
		RememberMeText: LoginRememberMeTextContainer,
		ShowForgotPassword: LoginShowForgotPasswordContainer,
		ShowRememberMe: LoginShowRememberMeContainer,
		SocialButtons: LoginSocialButtonsContainer,
		SocialLogins: LoginSocialLoginsContainer,
		Subtitle: LoginSubtitleContainer,
		Title: LoginTitleContainer,
		UsernameLabel: LoginUsernameLabelContainer,
	},
};
