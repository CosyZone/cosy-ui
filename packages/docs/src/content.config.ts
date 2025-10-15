import {
	makeLessonCollection,
	makeManualCollection,
} from "@coffic/cosy-content/schema";

export const collections = {
	lessons: makeLessonCollection("./content/lessons"),
	manuals: makeManualCollection("./content/manuals"),
};
