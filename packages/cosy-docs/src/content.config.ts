import { makeManualCollection } from "@coffic/cosy-content/schema";

export const collections = {
	manuals: makeManualCollection("./content/manuals"),
};
