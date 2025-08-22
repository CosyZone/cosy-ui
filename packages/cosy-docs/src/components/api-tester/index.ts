import ApiTesterExampleContainer from './ApiTesterExampleContainer.astro';
import ApiTesterEndpointsContainer from './ApiTesterEndpointsContainer.astro';
import ApiTesterTitleContainer from './ApiTesterTitleContainer.astro';
import ApiTesterDescriptionContainer from './ApiTesterDescriptionContainer.astro';
import ApiTesterShowHeadersContainer from './ApiTesterShowHeadersContainer.astro';
import ApiTesterDefaultHeadersContainer from './ApiTesterDefaultHeadersContainer.astro';
import ApiTesterShowResponseTimeContainer from './ApiTesterShowResponseTimeContainer.astro';
import ApiTesterShowRequestDetailsContainer from './ApiTesterShowRequestDetailsContainer.astro';
import ApiTesterCustomStyleContainer from './ApiTesterCustomStyleContainer.astro';

export const ApiTesterPackage = {
    Example: ApiTesterExampleContainer,
    Endpoints: ApiTesterEndpointsContainer,
    Title: ApiTesterTitleContainer,
    Description: ApiTesterDescriptionContainer,
    ShowHeaders: ApiTesterShowHeadersContainer,
    DefaultHeaders: ApiTesterDefaultHeadersContainer,
    ShowResponseTime: ApiTesterShowResponseTimeContainer,
    ShowRequestDetails: ApiTesterShowRequestDetailsContainer,
    CustomStyle: ApiTesterCustomStyleContainer
};
