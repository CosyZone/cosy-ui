import ApiTesterCustomStyleContainer from "./ApiTesterCustomStyleContainer.astro";
import ApiTesterDefaultHeadersContainer from "./ApiTesterDefaultHeadersContainer.astro";
import ApiTesterDescriptionContainer from "./ApiTesterDescriptionContainer.astro";
import ApiTesterEndpointsContainer from "./ApiTesterEndpointsContainer.astro";
import ApiTesterExampleContainer from "./ApiTesterExampleContainer.astro";
import ApiTesterShowHeadersContainer from "./ApiTesterShowHeadersContainer.astro";
import ApiTesterShowRequestDetailsContainer from "./ApiTesterShowRequestDetailsContainer.astro";
import ApiTesterShowResponseTimeContainer from "./ApiTesterShowResponseTimeContainer.astro";
import ApiTesterTitleContainer from "./ApiTesterTitleContainer.astro";

export const ApiTesterPackage = {
	Example: ApiTesterExampleContainer,
	Endpoints: ApiTesterEndpointsContainer,
	Title: ApiTesterTitleContainer,
	Description: ApiTesterDescriptionContainer,
	ShowHeaders: ApiTesterShowHeadersContainer,
	DefaultHeaders: ApiTesterDefaultHeadersContainer,
	ShowResponseTime: ApiTesterShowResponseTimeContainer,
	ShowRequestDetails: ApiTesterShowRequestDetailsContainer,
	CustomStyle: ApiTesterCustomStyleContainer,
};
