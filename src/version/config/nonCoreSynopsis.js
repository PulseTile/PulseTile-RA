import vaccinationsIcon from "../images/covers/vaccinations.jpg";
import topThreeThingsIcon from "../images/covers/top3.jpg";

import { vaccinationsSynopsisAction, topThreeThingsSynopsisAction } from "../actions/synopsisActions";

export const nonCoreSynopsisData = [
    { title: "Vaccinations", list: "vaccinations", statePropsName: 'vaccinationsSynopsis', icon: vaccinationsIcon },
    { title: "Top Three Things", list: "top3Things", statePropsName: 'topThreeThingsSynopsis', icon: topThreeThingsIcon },
];

export const nonCoreSynopsisSagas = [
    { heading: 'top3Things', action: vaccinationsSynopsisAction },
    { heading: 'vaccinations', action: topThreeThingsSynopsisAction },
];