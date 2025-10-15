import BasicContainer from "./BasicContainer.astro";
import EventsContainer from "./EventsContainer.astro";
import ImagesContainer from "./ImagesContainer.astro";
import MaxDisplayContainer from "./MaxDisplayContainer.astro";
import ShowPreviewContainer from "./ShowPreviewContainer.astro";
import SizeContainer from "./SizeContainer.astro";

export const ComponentPackage = {
	ComponentContainers: {
		Basic: BasicContainer,
		Events: EventsContainer,
		Images: ImagesContainer,
		MaxDisplay: MaxDisplayContainer,
		ShowPreview: ShowPreviewContainer,
		Size: SizeContainer,
	},
};
